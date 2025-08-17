const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Stripe = require("stripe");

admin.initializeApp();

const isLocal = process.env.FUNCTIONS_EMULATOR === "true";
if (isLocal) require("dotenv").config();


            const successUrl = isLocal
        ? "http://localhost:5173/success"
        : "https://mvp-go-seven.vercel.app/success";

      const cancelUrl = isLocal
        ? "http://localhost:5173/cancel"
        : "https://mvp-go-seven.vercel.app/cancel";

exports.createCheckoutSession = functions
  .runWith({
    secrets: ["STRIPE_SECRET_KEY", "STRIPE_PRICE_ID", "STRIPE_ONE_TIME"]
  })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be logged in to create a checkout session"
      );
    }

    try {
      const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

      const { type, sellerId } = data; 
      // sellerId = Firestore UID of the seller (if customer is buying from a seller)
      // If null, default to platform checkout.

      let priceId;
      let accountId = null;

      if (sellerId) {
        // 🔹 Lookup seller’s account + price from Firestore
        const sellerDoc = await admin.firestore().collection("users").doc(sellerId).get();
        if (!sellerDoc.exists) {
          throw new functions.https.HttpsError("not-found", "Seller account not found");
        }
        accountId = sellerDoc.data().stripeAccountId;
        priceId = sellerDoc.data().sellerPriceId;
      } else {
        // 🔹 Platform checkout
        if (type === "subscription") {
          priceId = process.env.STRIPE_PRICE_ID;
        } else if (type === "onetime") {
          priceId = process.env.STRIPE_ONE_TIME;
        }
      }

      if (!priceId) {
        throw new functions.https.HttpsError("invalid-argument", "No price ID found for checkout");
      }

      // Build Checkout Session config
      let sessionConfig = {
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: type === "subscription" ? "subscription" : "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: { buyerUid: context.auth.uid, sellerUid: sellerId || "platform" }
      };

      // If seller checkout → create session in their Stripe account
      let session;
      if (accountId) {
        session = await stripe.checkout.sessions.create(sessionConfig, {
          stripeAccount: accountId,
        });
      } else {
        // Platform checkout
        session = await stripe.checkout.sessions.create(sessionConfig);
      }

      return { url: session.url };
    } catch (err) {
      console.error("Checkout session error:", err);
      throw new functions.https.HttpsError("internal", err.message);
    }
  });



exports.stripeWebhook = functions
  .runWith({ secrets: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"] })
  .https.onRequest((req, res) => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const db = admin.firestore();

    (async () => {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object;
          const uid = session.metadata?.uid; 

          if (!uid) {
            console.error("No UID found in session metadata");
            break;
          }


          let planData = {
            planType: session.mode === "subscription" ? "monthly" : "onetime",
            active: true,
            startedAt: admin.firestore.FieldValue.serverTimestamp(),

          };


      await db.collection("users").doc(uid).set({
        plan: planData
      }, { merge: true });
          console.log("Checkout session recorded in DB for UID:", uid);
          break;
        }

case "invoice.payment_failed": {
  const invoice = event.data.object;
  const uid = invoice.metadata?.uid;

  if (uid) {
    await db.collection("users").doc(uid).set({
      plan: {
        ...invoice.plan,
        active: false,
        failedPaymentAt: admin.firestore.FieldValue.serverTimestamp(),
      }
    }, { merge: true });
    console.log("Subscription payment failed, disabled access for UID:", uid);
  }
  break;
}

case "customer.subscription.deleted": {
  const deletedSub = event.data.object;
  const uid = deletedSub.metadata?.uid;

  if (uid) {
    await db.collection("users").doc(uid).set({
      plan: {
        ...deletedSub.plan,
        active: false,
        canceledAt: admin.firestore.FieldValue.serverTimestamp(),
      }
    }, { merge: true });
    console.log("Subscription canceled, disabled access for UID:", uid);
  }
  break;
}

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    })();
  });










exports.createStripeConnectLink = functions
  .runWith({ secrets: ["STRIPE_SECRET_KEY"] })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError("unauthenticated", "User must be logged in");
    }

    try {
      const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
      const userId = context.auth.uid;

      // 1. Check if user already has a connected account
      const userDoc = await admin.firestore().collection("users").doc(userId).get();
      let accountId = userDoc.exists ? userDoc.data()?.stripeAccountId : null;
      let sellerPriceId = userDoc.exists ? userDoc.data()?.sellerPriceId : null;

      // 2. If no account exists, create one
      if (!accountId) {
        const account = await stripe.accounts.create({
          type: "express",
          email: context.auth.token.email || data.email || null,
        });
        accountId = account.id;

        // (a) Create a product in seller’s account
        const product = await stripe.products.create(
          { name: "One-time Access Deal" },
          { stripeAccount: accountId }
        );

        // (b) Create a price in seller’s account
        const price = await stripe.prices.create(
          {
            unit_amount: 500, // $5.00 — you can customize
            currency: "usd",
            product: product.id,
          },
          { stripeAccount: accountId }
        );
        sellerPriceId = price.id;

        // Save account + price to Firestore
        await admin.firestore().collection("users").doc(userId).set(
          { stripeAccountId: accountId, sellerPriceId },
          { merge: true }
        );
      }

      // 3. Create an onboarding link
      const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: cancelUrl,
        return_url: successUrl,
        type: "account_onboarding",
      });

      return { url: accountLink.url };
    } catch (err) {
      console.error("Stripe connect error:", err);
      throw new functions.https.HttpsError("internal", err.message);
    }
  });




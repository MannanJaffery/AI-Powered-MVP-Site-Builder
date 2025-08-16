const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Stripe = require("stripe");

admin.initializeApp();

const isLocal = process.env.FUNCTIONS_EMULATOR === "true";
if (isLocal) require("dotenv").config();



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

      const { type  } = data;

      const priceId = process.env.STRIPE_PRICE_ID;
      const onetimePriceId = process.env.STRIPE_ONE_TIME;

      const successUrl = isLocal
        ? "http://localhost:5173/success"
        : "https://mvp-go-seven.vercel.app/success";

      const cancelUrl = isLocal
        ? "http://localhost:5173/cancel"
        : "https://mvp-go-seven.vercel.app/cancel";

      let sessionConfig = {
        payment_method_types: ["card"],
        line_items: [],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
        uid: context.auth.uid
        }
      };

      if (type === "subscription") {
        sessionConfig.mode = "subscription";
        sessionConfig.line_items.push({ price: priceId, quantity: 1 });
      } else if (type === "onetime") {
        sessionConfig.mode = "payment";
        sessionConfig.line_items.push({ price: onetimePriceId, quantity: 1 });
      } else {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Invalid checkout type"
        );
      }

      const session = await stripe.checkout.sessions.create(sessionConfig);

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
            stripeSessionId: session.id,
          };

      if (session.mode === "subscription") {
        planData.subscriptionId = session.subscription;
      } else if (session.mode === "payment") {
        planData.paymentId = session.payment_intent;
      }

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
        ...invoice.plan, // keep existing plan info if needed
        active: false,   // mark plan as inactive due to failed payment
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

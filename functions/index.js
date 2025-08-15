// Load local .env only when running locally



const isLocal = process.env.FUNCTIONS_EMULATOR === "true";

if (isLocal) {
  require("dotenv").config();
}

const { onRequest } = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Stripe = require("stripe");

admin.initializeApp();

// Stripe instance: local .env or deployed secret
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || null);

// Example simple function
exports.helloFunctionv2 = onRequest((req, res) => {
  res.send("Hello from 2nd Gen!");
});


const priceId = process.env.STRIPE_PRICE_ID || null;
const onetimepriceId = process.env.STRIPE_ONE_TIME || null;

const successUrl = isLocal
  ? "http://localhost:5173/success"
  : "https://mvp-go-seven.vercel.app/success";

const cancelUrl = isLocal
  ? "http://localhost:5173/cancel"
  : "https://mvp-go-seven.vercel.app/cancel";

exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
  try {
    const { type } = data;


    let sessionConfig = {
      payment_method_types: ["card"],
      line_items: [],
      success_url: successUrl, 
      cancel_url: cancelUrl,
    };

    if (type === "subscription") {
      sessionConfig.mode = "subscription";
      sessionConfig.line_items.push({ price: priceId, quantity: 1 });
    } else if (type === "onetime") {
      sessionConfig.mode = "payment";
      sessionConfig.line_items.push({ price: onetimepriceId, quantity: 1 });
    } else {
      throw new functions.https.HttpsError("invalid-argument", "Invalid checkout type");
    }

  
    const session = await stripe.checkout.sessions.create(sessionConfig);

    return { url: session.url }; // Return URL to frontend
  } catch (err) {
    console.error("Checkout session error:", err);
    throw new functions.https.HttpsError("internal", err.message);
  }
});


//price_1RvmauLZs7wBNJ9aeCaMVSt0

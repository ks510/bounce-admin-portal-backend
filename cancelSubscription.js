import stripePackage from "stripe";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const { subscription } = JSON.parse(event.body);

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    // subscriptions are always cancelled at the end of billing period
    await stripe.subscriptions.del(subscription, { at_period_end: true });

    callback(null, success({ cancelled_subscription: subscription }));
  } catch (e) {
    callback(null, failure({ message: e.message }));
  }


}

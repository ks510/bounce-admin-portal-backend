import stripePackage from "stripe";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const { subscription } = JSON.parse(event.body);

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    await stripe.subscriptions.update(subscription, {
      cancel_at_period_end: true
    });

    // return newly created customer ID
    callback(null, success({ reactivated_subscription: subscription }));
  } catch (e) {
    callback(null, failure({ message: e.message }));
  }


}

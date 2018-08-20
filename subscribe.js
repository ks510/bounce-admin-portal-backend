import stripePackage from "stripe";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const { customer, planID } = JSON.parse(event.body);

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    // subscribing to Bounce premium plan, assuming customer payment method is already stored
    const subscription = await stripe.subscriptions.create({
      customer,
      items: [{plan: planID }],
    });

    callback(null, success(subscription));
  } catch (e) {
    callback(null, failure({ message: e.message }));
  }


}

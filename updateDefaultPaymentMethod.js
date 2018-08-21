import stripePackage from "stripe";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const { customer, token } = JSON.parse(event.body);

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    // subscribing to Bounce premium plan, assuming customer payment method is already stored
    // customer should only subscribe to one plan at a time
    const customerInfo = await stripe.customers.update(
      customer,
      { source: token },
    );

    callback(null, success({ message: "Updated default payment method" }));
  } catch (e) {
    callback(null, failure({ message: e.message }));
  }


}

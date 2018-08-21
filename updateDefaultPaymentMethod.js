import stripePackage from "stripe";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  // provide unique stripe customer ID and card token
  const { customer, token } = JSON.parse(event.body);

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);
  console.log("Updating customer payment...");
  try {
    // add payment method as default payment for this stripe customer
    const customerInfo = await stripe.customers.update(
      customer,
      { source: token },
    );

    callback(null, success({ message: "Updated default payment method" }));
  } catch (e) {
    callback(null, failure({ message: e.message }));
  }


}

import stripePackage from "stripe";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const { customer } = JSON.parse(event.body);

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    // get stripe customer object containing all details about customer
    const stripeCustomer = await stripe.customers.retrieve(
      customer
    );

    if (stripeCustomer) {
      // Return the retrieved csutomer
      callback(null, success(stripeCustomer));
    } else {
      callback(null, failure({ status: false, error: "Customer not found." }));
    }
  } catch (e) {
    callback(null, failure({ message: e.message }));
  }


}

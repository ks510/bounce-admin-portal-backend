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

    callback(null, success({ message: "Retrieved customer"));
  } catch (e) {
    callback(null, failure({ message: e.message }));
  }


}

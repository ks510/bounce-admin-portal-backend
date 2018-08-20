import stripePackage from "stripe";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const { email, source } = JSON.parse(event.body);

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    const newCustomer = await stripe.customers.create({
      email
    });

    // return newly created customer ID
    callback(null, success({ customerID: newCustomer["id"] }));
  } catch (e) {
    callback(null, failure({ message: e.message }));
  }


}

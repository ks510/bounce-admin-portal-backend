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
    console.log(newCustomer);
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ message: e.message }));
  }


}

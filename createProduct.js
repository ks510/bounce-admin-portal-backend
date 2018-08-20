import stripePackage from "stripe";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const { name, type } = JSON.parse(event.body);

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    const product = await stripe.products.create({
      name,
      type,
    });
    console.log(product);
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ message: e.message }));
  }

}

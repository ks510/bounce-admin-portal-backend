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

    callback(null, success({ productID: product["id"] }));
  } catch (e) {
    callback(null, failure({ message: e.message }));
  }

}

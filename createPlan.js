import stripePackage from "stripe";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const { product, nickname, currency, interval, amount } = JSON.parse(event.body);

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    const plan = await stripe.plans.create({
      product,
      nickname,
      currency,
      interval,
      amount,
    });
    console.log(plan);
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ message: e.message }));
  }

}

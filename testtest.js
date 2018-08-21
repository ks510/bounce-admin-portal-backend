import stripePackage from "stripe";

export async function main(event, context, callback) {

  const stripe = stripePackage(process.env.stripeSecretKey);
  console.log("new test api success");
}

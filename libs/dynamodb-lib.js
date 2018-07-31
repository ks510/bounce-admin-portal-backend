import AWS from "aws-sdk";

// region no longer needs to be hard coded

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}

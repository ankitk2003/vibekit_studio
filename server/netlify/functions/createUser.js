import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name } = JSON.parse(event.body);
  

  const result = await db.insert(users).values({ name }).returning();

  return {
    statusCode: 201,
    body: JSON.stringify(result),
  };
};
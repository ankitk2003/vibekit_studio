import { clearAuthCookie } from "../../db/utils/jwt.js";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Set-Cookie": clearAuthCookie(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "Logged out successfully" }),
  };
};

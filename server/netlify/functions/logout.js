import { clearAuthCookie } from "../../db/utils/jwt.js";
import { getCORSHeaders, errorResponse } from "../../db/utils/auth.js";

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: getCORSHeaders() };
  }

  if (event.httpMethod !== "POST") {
    return errorResponse(405, "Method Not Allowed");
  }

  return {
    statusCode: 200,
    headers: {
      "Set-Cookie": clearAuthCookie(),
      ...getCORSHeaders(),
    },
    body: JSON.stringify({ message: "Logged out successfully" }),
  };
};

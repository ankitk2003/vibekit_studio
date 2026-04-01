import { verifyToken } from "./jwt.js";
import cookie from "cookie";

export const verifyAuthToken = (event) => {
  try {
    const cookies = cookie.parse(event.headers.cookie || "");
    const token = cookies.auth_token;

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);
    return decoded;
  } catch (err) {
    return null;
  }
};

export const requireAuth = (event) => {
  const user = verifyAuthToken(event);

  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }

  return user;
};

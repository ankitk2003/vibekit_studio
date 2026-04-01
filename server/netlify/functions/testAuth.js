import { requireAuth } from "../../db/utils/auth"; // adjust path if needed

export const handler = async (event) => {
  // 🔐 check auth
  const authResult = requireAuth(event);

  // ❌ if not logged in
  if (authResult.statusCode === 401) {
    return authResult;
  }

  // ✅ if logged in → authResult = decoded user
  const user = authResult;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "You are authenticated ✅",
      user,
    }),
  };
};
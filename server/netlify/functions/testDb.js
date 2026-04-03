import { db } from "../../db/index.js";

export const handler = async () => {
  try {
    const result = await db.execute("SELECT NOW()");

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "DB Connected ✅",
        data: result,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message,
    };
  }
};
//
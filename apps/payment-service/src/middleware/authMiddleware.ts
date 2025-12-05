import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";

type Variables = {
  userId: string;
};

export const shouldBeUser = createMiddleware<{ Variables: Variables }>(
  async (c, next) => {
    const auth = getAuth(c);
    const userId = auth?.userId;

    if (!userId) {
      return c.json({
        message: "You are not logged in!",
      });
    }

    c.set("userId", userId);

    await next();
  }
);

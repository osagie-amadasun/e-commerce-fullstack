import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";
import { CustomJwtSessionClaims } from "@repo/types";

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

export const shouldBeAdmin = createMiddleware<{ Variables: Variables }>(
  async (c, next) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({
        message: "You are not logged in!",
      });
    }
    const claims = auth.sessionClaims as CustomJwtSessionClaims;
    if (claims.metadata?.role !== "admin") {
      return c.json({
        message: "Unauthorized!",
      });
    }

    c.set("userId", auth.userId);

    await next();
  }
);

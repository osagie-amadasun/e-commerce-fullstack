import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import stripe from "../utils/stripe.js";

const app = new Hono();

export const formatUptime = (seconds: number): string => {
  if (seconds < 60) return `${Math.floor(seconds)} seconds`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
  return `${Math.floor(seconds / 86400)} days`;
};

app.use("*", clerkMiddleware());

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    formatted: formatUptime(process.uptime()),
    timestamp: new Date().toLocaleDateString(),
  });
});
app.post("/create-stripe-product", async (c) => {
  const res = await stripe.products.create({
    id: "123",
    name: "test product",
    default_price_data: {
      currency: "usd",
      unit_amount: 10 * 1000,
    }
  });
  return c.json(res);
});
app.get("/test", shouldBeUser, (c) => {
  return c.json({
    message: "Payment service is authenticated!!",
    userId: c.get("userId")
  });
});


const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: 8002,
      },
      (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
      }
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();

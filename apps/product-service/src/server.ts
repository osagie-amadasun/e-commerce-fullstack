import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { shouldBeUser } from "./middleware/authMiddleware";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
  })
);

app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toLocaleDateString(),
  });
});

app.get("/test", shouldBeUser, (req: Request, res: Response) => {
  const response = {
    message: "Product service is authenticated!",
    userId: req.userId
  }
  console.log(response)
  return res.status(200).json(response);
});

app.listen(8003, () => {
  console.log(
    "Product service is running on port 8003 from an express framework"
  );
});

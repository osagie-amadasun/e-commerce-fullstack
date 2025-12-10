import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import { CustomJwtSessionClaims } from "@repo/types";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const shouldBeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  const userId = auth.userId;

  if (!userId) {
    return res.status(401).json({
      message: "You're not logged in!",
    });
  }

  req.userId = userId;

  return next();
};

export const shouldBeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  if (!auth.userId) {
    return res.status(401).json({
      message: "You're not logged in!",
    });
  }
  const claims = auth.sessionClaims as CustomJwtSessionClaims;
  // If the user IS NOT an admin, reject and RETURN.
  if (claims.metadata?.role !== "admin") {
    return res.status(403).send({
      message: "Unauthorized",
    });
  }

  // If the user IS an admin, the code proceeds here.
  req.userId = auth.userId;
  return next(); // Allows the request to proceed.
};

import { json, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: {
        id: string;
        email: string;
      };
    }
  }
}

//protect middleware for routes
export const protectRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ errror: "Unthorised - no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;

    if (!decoded) {
      return res.status(401).json({ errror: "Unthorised - Invalid token" });
    }

    const user = await prisma.user.findUnique({
      where: { userId: decoded.id },
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.currentUser = decoded;

    next();
  } catch (error) {}
};

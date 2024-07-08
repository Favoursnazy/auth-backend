import { Response } from "express";
import jwt from "jsonwebtoken";

//@desc Authenticated user & get token
export const generateToken = (id: string, email: string, res: Response) => {
  const token = jwt.sign({ id, email }, process.env.JWT_KEY!, {
    expiresIn: "30d",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS cross site scripting
    sameSite: "strict", // CSFR attack cross-site request fogery
    secure: process.env.NODE_ENV !== "development", //HTTPS
  });

  return token;
};

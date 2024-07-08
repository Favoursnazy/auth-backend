import { Request, Response } from "express";
import prisma from "../db/prisma";

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const currentUser = await prisma.user.findUnique({
      where: { userId: userId },
    });

    if (!currentUser) {
      return res.status(404).json({ error: "user not found" });
    }

    res.status(200).json({
      status: "success",
      message: "user fetched",
      data: {
        userId: currentUser.userId,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        phone: currentUser.phone,
      },
    });
  } catch (error) {}
};

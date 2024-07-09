import { Response, Request } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { generateToken } from "../utils/token";
import { Password } from "../utils/password";
import prisma from "../db/prisma";

export const regsiterUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new BadRequestError("Email in use!");
    }

    const hashedPassword = await Password.toHash(password);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
      },
    });

    if (newUser) {
      const token = generateToken(newUser.userId, newUser.email, res);
      await prisma.organisation.create({
        data: {
          name: `${firstName}'s Organisation`,
          description: `${firstName}'s newly created organisation`,
          authorId: newUser.userId,
        },
      });
      res.status(201).json({
        status: "success",
        message: "Registration successful",
        data: {
          accessToken: token,
          user: {
            userId: newUser.userId,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone,
          },
        },
      });
    } else {
      res.status(400).json({
        status: "Bad request",
        message: "Registration unsuccessful",
      });
    }
  } catch (error: any) {
    console.log("Error in signup uer controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (
      existingUser &&
      (await Password.compare(existingUser.password, password))
    ) {
      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: {
          accessToken: generateToken(
            existingUser.userId,
            existingUser.email,
            res
          ),
          user: {
            userId: existingUser.userId,
            fullName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email,
            phone: existingUser.phone,
          },
        },
      });
    } else {
      // if user was not found in database, send error message
      res.status(401).json({
        status: "Bad request",
        message: "Authentication failed",
      });
    }
  } catch (error: any) {
    console.log("Error in login uer controler", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

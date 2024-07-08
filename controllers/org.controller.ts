import { Request, Response } from "express";
import prisma from "../db/prisma";

export const userOganisation = async (req: Request, res: Response) => {
  try {
    const userId = req.currentUser?.id!;

    if (userId) {
      const organisation = await prisma.organisation.findMany({
        where: {
          OR: [
            {
              authorId: {
                contains: userId,
              },
            },
            {
              users: {
                hasEvery: [userId],
              },
            },
          ],
        },
      });
      res.status(200).json({
        status: "success",
        message: "User Organisations fetched!",
        data: {
          organisation,
        },
      });
    } else {
      res.status(404).json({
        message: "user not found!",
      });
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getSingleOrganisation = async (req: Request, res: Response) => {
  try {
    const { orgId } = req.params;

    const getSingleOrg = await prisma.organisation.findFirst({
      where: { orgId },
    });

    if (getSingleOrg) {
      res.status(200).json({
        status: "success",
        message: "Organisation fetched!",
        data: {
          orgId: getSingleOrg.orgId,
          name: getSingleOrg.name,
          description: getSingleOrg.description,
        },
      });
    }

    res.send(getSingleOrg);
  } catch (error: any) {
    console.log(error.message);
  }
};

export const createOrganisation = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const authorId = req.currentUser?.id!;
  try {
    if (!name || !description) {
      return res.status(400).json({
        mesage: "name and deription fields ae required!",
      });
    }

    const createOrg = await prisma.organisation.create({
      data: {
        name,
        description,
        authorId,
      },
    });

    if (createOrg) {
      res.status(201).json({
        status: "success",
        message: "Organisation created successfully",
        data: {
          orgId: createOrg.orgId,
          name: createOrg.name,
          description: createOrg.description,
        },
      });
    } else {
      res.status(400).json({
        status: "Bad Request",
        message: "Client error",
        statusCode: 400,
      });
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export const addUserToOrg = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { orgId } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { userId } });

    if (user) {
      const addUser = await prisma.organisation.update({
        where: { orgId },
        data: {
          users: {
            push: userId,
          },
        },
      });

      if (addUser) {
        res.status(200).json({
          status: "success",
          message: "User added to organisation successfully",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found!",
      });
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

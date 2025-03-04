import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUserToken } from "../utils/interfaces";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["info"],
});

class Verify {
  verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        throw new Error("Token not provided");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "");
      (req as IUserToken).token = decoded;

      next();
    } catch (error: Error | any) {
      res.status(500).json({
        status: false,
        message: error?.message,
        data: null,
      });
    }
  };
}

export default new Verify();

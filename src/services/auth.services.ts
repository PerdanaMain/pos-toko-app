import { PrismaClient } from "@prisma/client";
import {
  IRegisterPayload,
  Admin,
  ILoginPayload,
  ILoginResponse,
} from "../utils/interfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient({
  log: ["info"],
});

class AuthService {
  constructor(private prisma: PrismaClient) {
    this.prisma = new PrismaClient({
      log: ["info"],
    });
  }

  register = async (payload: IRegisterPayload): Promise<Admin> => {
    const exist = await this.prisma.admin.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (exist) {
      return Promise.reject(new Error("User already exists"));
    }

    return await this.prisma.admin.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: await bcrypt.hash(payload.password, 10),
      },
    });
  };

  login = async (payload: ILoginPayload): Promise<ILoginResponse> => {
    const user = await this.prisma.admin.findFirst({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      return Promise.reject(new Error("email not found"));
    }

    const matched = await bcrypt.compare(payload.password, user.password);

    if (!matched) {
      return Promise.reject(new Error("password not matched"));
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    return { admin: user, token };
  };
}

export default new AuthService(prisma);

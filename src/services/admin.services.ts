import { PrismaClient } from "@prisma/client";

class AdminService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      log: ["info"],
    });
  }

  findByEmail = (email: string) => {
    return this.prisma.admin.findFirst({
      where: {
        email,
      },
    });
  };

  createAdmin = (data: { name: string; email: string; password: string }) => {
    return this.prisma.admin.create({
      data,
    });
  };
}

export default new AdminService();

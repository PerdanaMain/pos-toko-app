import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["info"],
});

class Database {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  connect = async () => {
    const res = await this.prisma.$queryRaw`SELECT 1`;

    if (res) {
      return "Ok";
    }
  };
}

export default Database;

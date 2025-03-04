import { PrismaClient } from "@prisma/client";
import { IInventoryPayload, Inventory } from "../utils/interfaces";

const prisma = new PrismaClient();

class InventoryService {
  constructor(private prisma: PrismaClient) {
    this.prisma = new PrismaClient({
      log: ["info"],
    });
  }

  getAllInventories = async (): Promise<Inventory[]> => {
    return await this.prisma.inventory.findMany();
  };

  createInventory = async (payload: IInventoryPayload): Promise<Inventory> => {
    const exist = await this.prisma.inventory.findFirst({
      where: {
        name: payload.name,
      },
    });

    if (exist) {
      return Promise.reject(new Error("Inventory already exists"));
    }

    return await this.prisma.inventory.create({
      data: {
        name: payload.name,
        description: payload.description,
      },
    });
  };

  updateInventory = async (
    id: string,
    payload: IInventoryPayload
  ): Promise<Inventory> => {
    const exist = await this.prisma.inventory.findFirst({
      where: {
        id,
      },
    });

    if (!exist) {
      return Promise.reject(new Error("Inventory not found"));
    }

    return await this.prisma.inventory.update({
      where: {
        id,
      },
      data: {
        name: payload.name,
        description: payload.description,
      },
    });
  };

  deleteInventory = async (id: string): Promise<Inventory> => {
    const exist = await this.prisma.inventory.findFirst({
      where: {
        id,
      },
    });

    if (!exist) {
      return Promise.reject(new Error("Inventory not found"));
    }

    return await this.prisma.inventory.delete({
      where: {
        id,
      },
    });
  };
}

export default new InventoryService(prisma);

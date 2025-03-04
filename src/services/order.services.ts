import { PrismaClient } from "@prisma/client";
import CartServices from "./cart.services";

const prisma = new PrismaClient();

class OrderServices {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getAllOrders = async () => {
    return await this.prisma.orders.findMany({
      include: {
        cart: {
          include: {
            cart_items: {
              select: {
                id: true,
                cartId: true,
                productId: true,
                quantity: true,
                sub_total: true,
                product: true,
              },
            },
          },
        },
      },
    });
  };

  getOrderById = async (orderId: string) => {
    return await this.prisma.orders.findUnique({
      where: {
        id: orderId,
      },
      include: {
        cart: {
          include: {
            cart_items: {
              select: {
                id: true,
                cartId: true,
                productId: true,
                quantity: true,
                sub_total: true,
                product: true,
              },
            },
          },
        },
      },
    });
  };

  getOrdersByDate = async (startDate: string, endDate: string) => {
    return await this.prisma.orders.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
  };

  getStatistics = async (startDate?: string, endDate?: string) => {
    if (!startDate && !endDate) {
      throw new Error("At least one of start date or end date is required");
    }

    const whereClause: any = {};
    if (startDate) {
      whereClause.createdAt = {
        ...whereClause.createdAt,
        gte: new Date(startDate),
      };
    }
    if (endDate) {
      whereClause.createdAt = {
        ...whereClause.createdAt,
        lte: new Date(endDate),
      };
    }

    const orders = await this.prisma.orders.findMany({
      where: whereClause,
    });

    const total_amount = orders
      .map((order: { total_amount: number }) => order.total_amount)
      .reduce((a: number, b: number) => a + b, 0);

    return {
      total_orders: orders.length,
      total_amount,
    };
  };

  createOrder = async (cartId: string) => {
    try {
      const cart = await CartServices.getCartById(cartId);

      if (!cart) {
        throw new Error("Cart not found");
      }

      if (cart?.isDeleted) {
        throw new Error("Cart already paid");
      }

      const total_amount = cart?.cart_items
        .map((item: { sub_total: number }) => item.sub_total)
        .reduce((a: number, b: number) => a + b, 0);

      const order = await this.prisma.orders.create({
        data: {
          cartId,
          total_amount: total_amount,
          status: "success",
          isExpired: true,
          expiredAt: new Date(),
        },
      });

      await CartServices.updateCartAfterOrder(cartId);
      return order;
    } catch (error: Error | any) {
      throw new Error(error?.message);
    }
  };
}

export default new OrderServices(prisma);

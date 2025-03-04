import { PrismaClient } from "@prisma/client";
import { ICartPayload, Cart } from "../utils/interfaces";
import ProductServices from "./product.services";

const prisma = new PrismaClient();

class CartServices {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getCartsByEmail = async (email: string): Promise<Cart[] | null> => {
    const carts = await this.prisma.carts.findMany({
      where: {
        email,
      },
      include: {
        cart_items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (carts.length === 0) {
      throw new Error("Cart not found");
    }

    return carts;
  };

  createCart = async (data: ICartPayload): Promise<Cart> => {
    const products = await ProductServices.getProductsByIds(
      data.items.map((item) => item.productId)
    );

    if (!products) {
      throw new Error("Products not found");
    }

    const cart = await this.prisma.carts.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        cart_items: {
          create: data.items.map((item) => {
            const product = products.find((p) => p.id === item.productId);

            if (!product) {
              throw new Error("Product not found");
            }

            return {
              productId: item.productId,
              quantity: item.quantity,
              sub_total: product.price ? product.price * item.quantity : 0,
            };
          }),
        },
      },
    });

    return cart;
  };
}

export default new CartServices(prisma);

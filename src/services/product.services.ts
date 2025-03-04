import { PrismaClient } from "@prisma/client";
import { IProductPayload, Product } from "../utils/interfaces";
import {
  uploadToCloudinary,
  getUrlCloudinary,
  destroyImageCloudinary,
} from "../utils/cloudinary";

const prisma = new PrismaClient();

class ProductService {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getAllProducts = async (): Promise<Product[]> => {
    const fetch = await this.prisma.products.findMany({
      include: { inventory: true },
    });

    return fetch.map((product) => ({
      id: product.id,
      name: product.name,
      inventoryId: product.inventoryId,
      description: product.description,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      image: product.image ? getUrlCloudinary(product.image) : null,
      inventory: product.inventory,
    }));
  };

  getProduct = async (id: string): Promise<Product | null> => {
    const fetch = await this.prisma.products.findUnique({
      where: {
        id,
      },
      include: { inventory: true },
    });

    const product = {
      id: fetch?.id ?? "",
      name: fetch?.name ?? "",
      inventoryId: fetch?.inventoryId ?? null,
      description: fetch?.description ?? null,
      price: fetch?.price ?? null,
      stock: fetch?.stock ?? null,
      createdAt: fetch?.createdAt ?? new Date(),
      updatedAt: fetch?.updatedAt ?? new Date(),
      image: fetch?.image ? getUrlCloudinary(fetch?.image) : null,
      inventory: fetch?.inventory ?? null,
    };

    return product;
  };

  createProduct = async (
    payload: IProductPayload,
    file: any
  ): Promise<Product> => {
    if (!payload.name) {
      throw new Error("Name is required");
    }

    if (!payload.price) {
      throw new Error("Price is required");
    }

    if (!payload.stock) {
      throw new Error("Stock is required");
    }

    const stock = parseFloat(payload.stock.toString());
    const price = parseFloat(payload.price.toString());

    if (isNaN(stock)) {
      throw new Error("Stock must be a number");
    }
    if (isNaN(price)) {
      throw new Error("Price must be a number");
    }

    const imageInfo = (await uploadToCloudinary(file?.buffer)) as {
      public_id: string;
    };

    return await this.prisma.products.create({
      data: {
        name: payload.name,
        price,
        description: payload.description,
        image: imageInfo.public_id,
        stock,
        inventoryId: payload.inventoryId,
      },
      include: { inventory: true },
    });
  };

  updateProduct = async (
    id: string,
    payload: IProductPayload,
    file: any
  ): Promise<Product> => {
    const product = await this.prisma.products.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    let imageInfo: { public_id: string } | null = null;

    if (file) {
      // Destroy the old image
      if (product?.image) {
        await destroyImageCloudinary(product.image);
      }

      imageInfo = (await uploadToCloudinary(file?.buffer)) as {
        public_id: string;
      };
    } else {
      imageInfo = { public_id: product.image ?? "" };
    }

    return await this.prisma.products.update({
      where: {
        id,
      },
      data: {
        name: payload.name,
        price: parseFloat(payload.price.toString()),
        description: payload.description,
        image: imageInfo.public_id,
        stock: parseFloat(payload.stock.toString()),
        inventoryId: payload.inventoryId,
      },
      include: { inventory: true },
    });
  };

  deleteProduct = async (id: string): Promise<Product> => {
    const product = await this.prisma.products.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.image) {
      await destroyImageCloudinary(product.image);
    }

    return await this.prisma.products.delete({
      where: {
        id,
      },
      include: { inventory: true },
    });
  };
}

export default new ProductService(prisma);

import { PrismaClient } from "@prisma/client";
import { IProductPayload, Product } from "../utils/interfaces";
import { uploadToCloudinary, getUrlCloudinary } from "../utils/cloudinary";

const prisma = new PrismaClient();

class ProductService {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getAllProducts = async (): Promise<Product[]> => {
    const fetch = await this.prisma.products.findMany();

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
    }));
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
    });
  };
}

export default new ProductService(prisma);

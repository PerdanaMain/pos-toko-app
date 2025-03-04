import { Request, Response } from "express";
import ProductServices from "../services/product.services";

class ProductController {
  index = async (req: Request, res: Response) => {
    try {
      const products = await ProductServices.getAllProducts();

      res.status(200).json({
        status: true,
        message: "Product retrieved successfully",
        data: products,
      });
    } catch (error: Error | any) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  };
  create = async (req: Request, res: Response) => {
    try {
      const { name, price, description, stock, inventoryId } = req.body;
      const image = req.file;

      await ProductServices.createProduct(
        {
          name,
          price,
          description,
          stock,
          inventoryId,
        },
        image
      );

      res.status(201).json({
        status: true,
        message: "Product created successfully",
        data: null,
      });
    } catch (error: Error | any) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  };

  show = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await ProductServices.getProduct(id);

      res.status(200).json({
        status: true,
        message: "Product retrieved successfully",
        data: product,
      });
    } catch (error: Error | any) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, price, description, stock, inventoryId } = req.body;
      const image = req.file;

      await ProductServices.updateProduct(
        id,
        {
          name,
          price,
          description,
          stock,
          inventoryId,
        },
        image
      );

      res.status(200).json({
        status: true,
        message: "Product updated successfully",
        data: null,
      });
    } catch (error: Error | any) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  };

  destroy = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await ProductServices.deleteProduct(id);

      res.status(200).json({
        status: true,
        message: "Product deleted successfully",
        data: null,
      });
    } catch (error: Error | any) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  };
}
export default new ProductController();

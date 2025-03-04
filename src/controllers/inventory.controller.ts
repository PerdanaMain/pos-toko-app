import { Request, Response } from "express";
import InventoryService from "../services/inventory.service";

class InventoryController {
  index = async (req: Request, res: Response) => {
    try {
      const inventories = await InventoryService.getAllInventories();

      res.status(200).json({
        status: true,
        message: "Inventory index",
        data: inventories,
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
      const { name, description } = req.body;

      const inventory = await InventoryService.createInventory({
        name,
        description,
      });

      res.status(200).json({
        status: true,
        message: "Inventory created successfully",
        data: inventory,
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
      const id = req.params.id;
      const { name, description } = req.body;

      const inventory = await InventoryService.updateInventory(id, {
        name,
        description,
      });

      res.status(200).json({
        status: true,
        message: "Inventory updated successfully",
        data: inventory,
      });
    } catch (error: Error | any) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const inventory = await InventoryService.deleteInventory(id);

      res.status(200).json({
        status: true,
        message: "Inventory deleted successfully",
        data: inventory,
      });
    } catch (error: Error | any) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  };

  getProducts = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const products = await InventoryService.getInventoryProducts(id);

      res.status(200).json({
        status: true,
        message: "Get products by inventory",
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
}

export default new InventoryController();

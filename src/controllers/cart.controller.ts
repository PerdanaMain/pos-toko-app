import { Request, Response } from "express";
import CartServices from "../services/cart.services";

class CartController {
  show = async (req: Request, res: Response) => {
    try {
      const { email } = req.query;
      const carts = await CartServices.getCartsByEmail(email as string);

      res.status(200).json({
        status: true,
        message: "Cart retrieved successfully",
        data: carts,
      });
    } catch (error: Error | any) {
      res.status(500).json({
        status: false,
        message: error?.message,
      });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { name, email, phone, items } = req.body;

      const result = await CartServices.createCart({
        name,
        email,
        phone,
        items,
      });

      res.status(201).json({
        status: true,
        message: "Cart created successfully",
        data: result,
      });
    } catch (error: Error | any) {
      res.status(500).json({
        status: false,
        error: error?.message,
      });
    }
  };
}

export default new CartController();

import { Request, Response } from "express";
import OrderServices from "../services/order.services";
import CartServices from "../services/cart.services";

class OrderController {
  show = async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const order = await OrderServices.getOrderById(orderId);

      res.status(200).json({
        status: true,
        data: { invoice: order },
        message: "Order created",
      });
    } catch (error: Error | any) {
      res.status(500).json({ status: false, message: error?.message });
    }
  };
  create = async (req: Request, res: Response) => {
    try {
      const { cartId } = req.params;
      const order = await OrderServices.createOrder(cartId);

      res.status(201).json({
        status: true,
        data: { invoice: order },
        message: "Order created",
      });
    } catch (error: Error | any) {
      res.status(500).json({ status: false, message: error?.message });
    }
  };
}

export default new OrderController();

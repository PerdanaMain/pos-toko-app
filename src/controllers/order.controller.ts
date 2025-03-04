import { Request, Response } from "express";
import OrderServices from "../services/order.services";
import CartServices from "../services/cart.services";

class OrderController {
  index = async (req: Request, res: Response) => {
    try {
      const orderrs = await OrderServices.getAllOrders();

      res.status(200).json({
        status: true,
        data: { invoices: orderrs },
        message: "Invoices fetched successfully",
      });
    } catch (error: Error | any) {
      res.status(500).json({ status: false, message: error?.message });
    }
  };
  show = async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const order = await OrderServices.getOrderById(orderId);

      res.status(200).json({
        status: true,
        data: { invoice: order },
        message: "Invoice fetched successfully",
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
        message: "Invoice created successfully",
      });
    } catch (error: Error | any) {
      res.status(500).json({ status: false, message: error?.message });
    }
  };

  statistics = async (req: Request, res: Response) => {
    try {
      const { startDate, endDate } = req.query;
      const statistics = await OrderServices.getStatistics(
        startDate as string,
        endDate as string
      );
      res.status(200).json({
        status: true,
        data: { statistics },
        message: "Statistics fetched successfully",
      });
    } catch (error: Error | any) {
      res.status(500).json({ status: false, message: error?.message });
    }
  };
}

export default new OrderController();

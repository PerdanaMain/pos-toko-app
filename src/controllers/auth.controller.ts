import { Request, Response } from "express";
import AuthService from "../services/auth.services";

class AuthController {
  register = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      await AuthService.register({ name, email, password });
      res.status(201).json({
        status: true,
        message: "User registered successfully",
        data: null,
      });
    } catch (error: Error | any) {
      res.status(500).json({
        status: true,
        message: `Internal Server Error: ${error}`,
        data: null,
      });
    }
  };
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login({ email, password });

      res.status(201).json({
        status: true,
        message: "User login successfully",
        data: result,
      });
    } catch (error: Error | any) {
      res.status(500).json({
        status: true,
        data: null,
        error: `Internal Server Error: ${error}`,
      });
    }
  };
  logout = async (req: Request, res: Response) => {};
}

export default new AuthController();

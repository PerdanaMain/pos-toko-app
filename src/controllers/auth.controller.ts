import { Request, Response } from "express";
import AdminServices from "../services/admin.services";
import bcrypt from "bcrypt";

class AuthController {
  register = async (req: Request, res: Response): Promise<void> => {
    // Your registration logic here
    try {
      const { name, email, password } = req.body;

      const exist = await AdminServices.findByEmail(email);

      if (exist) {
        res.status(400).json({ error: "User already exists" });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      await AdminServices.createAdmin({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: "User registered successfully" });
    } catch (error: Error | any) {
      res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
  };
  login = async (req: Request, res: Response) => {
    // login logic
  };
  logout = async (req: Request, res: Response) => {};
}

export default new AuthController();

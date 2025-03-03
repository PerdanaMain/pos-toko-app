import { z } from "zod";
import { StatusCodes } from "http-status-codes";

class Schema {
  registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  });

  loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  inventorySchema = z.object({
    name: z.string().min(3),
    description: z.string().min(6),
  });
}

export default new Schema();

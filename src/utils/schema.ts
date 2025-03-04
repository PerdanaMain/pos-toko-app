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

  productSchema = z.object({
    name: z.string().min(3),
    price: z.number().min(0),
    description: z.string().min(6),
    image: z
      .any()
      .refine((val) => val !== undefined && val !== null, {
        message: "Image is required",
      })
      .refine(
        (val) => {
          // For API uploads, check for the file's mimetype property
          if (val && val.mimetype) {
            return ["image/jpeg", "image/png", "image/jpg"].includes(
              val.mimetype
            );
          }
          return false;
        },
        { message: "Unsupported file format. Use JPEG, PNG or JPG" }
      ),
  });
}

export default new Schema();

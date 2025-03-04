import express from "express";
import AuthController from "../controllers/auth.controller";
import InventoryController from "../controllers/inventory.controller";
import ProductController from "../controllers/product.controller";
import Validation from "../middlewares/validation.middleware";
import Schema from "../utils/schema";
import { fileFilter, fileStorage } from "../utils/multer";
import multer from "multer";

const router = express.Router();
const prefix = "/api";
const upload = multer({
  storage: fileStorage,
  fileFilter,
});

// AUTH ROUTES
router.post(
  prefix + "/auth/register",
  Validation.validateRequest(Schema.registerSchema),
  AuthController.register
);
router.post(
  prefix + "/auth/login",
  Validation.validateRequest(Schema.loginSchema),
  AuthController.login
);

// INVENTORY ROUTES
router.get(prefix + "/inventory", InventoryController.index);
router.post(
  prefix + "/inventory",
  Validation.validateRequest(Schema.inventorySchema),
  InventoryController.create
);
router.put(
  prefix + "/inventory/:id",
  Validation.validateRequest(Schema.inventorySchema),
  InventoryController.update
);
router.delete(prefix + "/inventory/:id", InventoryController.delete);

// PRODUCT ROUTES
router.get(prefix + "/products", ProductController.index);
router.post(
  prefix + "/products",
  upload.single("image"),
  ProductController.create
);

export default router;

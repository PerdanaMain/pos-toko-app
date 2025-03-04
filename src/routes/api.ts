import express from "express";
import AuthController from "../controllers/auth.controller";
import InventoryController from "../controllers/inventory.controller";
import ProductController from "../controllers/product.controller";
import Validation from "../middlewares/validation.middleware";
import Verify from "../middlewares/verify.middleware";
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
router.get(
  prefix + "/inventory",
  Verify.verifyToken,
  InventoryController.index
);
router.post(
  prefix + "/inventory",
  Verify.verifyToken,
  Validation.validateRequest(Schema.inventorySchema),
  InventoryController.create
);
router.put(
  prefix + "/inventory/:id",
  Verify.verifyToken,
  Validation.validateRequest(Schema.inventorySchema),
  InventoryController.update
);
router.delete(
  prefix + "/inventory/:id",
  Verify.verifyToken,
  InventoryController.delete
);

router.get(prefix + "/inventory/:id/products", InventoryController.getProducts);

// PRODUCT ROUTES
router.get(prefix + "/products", ProductController.index);
router.get(prefix + "/products/:id", ProductController.show);
router.post(
  prefix + "/products",
  Verify.verifyToken,
  upload.single("image"),
  ProductController.create
);
router.put(
  prefix + "/products/:id",
  Verify.verifyToken,
  upload.single("image"),
  ProductController.update
);
router.delete(
  prefix + "/products/:id",
  Verify.verifyToken,
  ProductController.destroy
);

export default router;

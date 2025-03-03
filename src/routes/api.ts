import express from "express";
import AuthController from "../controllers/auth.controller";
import Validation from "../middlewares/validation.middleware";
import Schema from "../utils/schema";

const router = express.Router();
const prefix = "/api";

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

export default router;

import express from "express";

import AuthController from "../../controllers/auth.controller.js";

import validate from "../../middlewares/validate.middleware.js";
import authValidation from "../../validations/auth.validation.js";

const router = express.Router();

router.post("/register", validate(authValidation.signUp), AuthController.register);
router.post("/login", validate(authValidation.signIn), AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout", AuthController.logout);

export default router;

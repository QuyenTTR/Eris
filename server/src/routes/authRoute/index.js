import express from "express";

import AuthController from "../../controllers/auth.controller.js";

import validate from "../../middlewares/validate.middleware.js";
import authValidation from "../../validations/auth.validation.js";

const router = express.Router();

router.post("/signup", validate(authValidation.signUp), AuthController.signUp);
router.post("/signin", validate(authValidation.signIn), AuthController.signIn);
router.post("/refresh", AuthController.refreshToken);
router.post("/signout", AuthController.signOut);

export default router;

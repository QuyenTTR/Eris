import express from "express";

import AuthController from "../../controllers/auth.controller.js";

import validate from "../../middlewares/validate.middleware.js";
import userValidation from "../../validations/user.validation.js";

const router = express.Router();

router.post("/signup", validate(userValidation.signUp), AuthController.signUp);

export default router;

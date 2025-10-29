import express from "express";

import categoryController from "../../controllers/category.controller.js";

import validate from "../../middlewares/validate.middleware.js";
import categoryValidation from "../../validations/category.validation.js";

const router = express.Router();

router.get("/", categoryController.getAll);
router.post("/", validate(categoryValidation.create), categoryController.create);
router.put("/:id", validate(categoryValidation.update), categoryController.update);
router.delete("/:id", categoryController.delete);

export default router;

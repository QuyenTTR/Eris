import express from "express";

import CategoryController from "../../controllers/category.controller.js";

import validate from "../../middlewares/validate.middleware.js";
import categoryValidation from "../../validations/category.validation.js";

const router = express.Router();

router.get("/", CategoryController.getAll);
router.post("/", validate(categoryValidation.create), CategoryController.create);
router.put("/:id", validate(categoryValidation.update), CategoryController.update);
router.patch("/:id/toggle-status", CategoryController.toggleStatus);
router.delete("/:id", CategoryController.delete);

export default router;

import express from "express";

import CategoryGroupController from "../../controllers/categoryGroup.controller.js";

import validate from "../../middlewares/validate.middleware.js";
import categoryGroupValidation from "../../validations/categoryGroup.validation.js";

const router = express.Router();

router.get("/", CategoryGroupController.getAll);
router.post("/", validate(categoryGroupValidation.create), CategoryGroupController.create);
router.put("/:id", validate(categoryGroupValidation.update), CategoryGroupController.update);
router.patch("/:id/toggle-status", CategoryGroupController.toggleStatus);
router.delete("/:id", CategoryGroupController.delete);

export default router;

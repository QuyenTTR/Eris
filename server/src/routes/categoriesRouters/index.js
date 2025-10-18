import express from "express";

import categoryController from "../../controllers/CategoryController.js";
import CategoryValidation from "../../middlewares/CategoryValidation.js";

const router = express.Router();

router.get("/", categoryController.getAll);
router.post("/", CategoryValidation, categoryController.create);
router.put("/:id", CategoryValidation, categoryController.update);
router.delete("/:id", categoryController.delete);

export default router;

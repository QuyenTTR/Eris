import express from "express";

import categoryController from "../../controllers/CategoryController.js";

const router = express.Router();

router.get("/", categoryController.getAll);
router.post("/", categoryController.create);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);

export default router;

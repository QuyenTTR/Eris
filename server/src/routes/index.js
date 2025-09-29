import express from "express";

import categoriesRouter from "./categoriesRouters/index.js";

const router = express.Router();

router.use("/category", categoriesRouter);

export default router;

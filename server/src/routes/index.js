import express from "express";

import categoriesRoute from "./categoriesRoute/index.js";
import authRoute from "./authRoute/index.js";

const router = express.Router();

router.use("/category", categoriesRoute);
router.use("/auth", authRoute);

export default router;

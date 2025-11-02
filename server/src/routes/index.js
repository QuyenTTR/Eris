import express from "express";

import categoriesRoute from "./categoriesRoute/index.js";
import authRoute from "./authRoute/index.js";
import protectedRoute from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use(protectedRoute);
router.use("/category", categoriesRoute);

export default router;

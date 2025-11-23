import express from "express";

import categoriesRoute from "./categoriesRoute/index.js";
import authRoute from "./authRoute/index.js";
import protectedRoute from "../middlewares/auth.middleware.js";
import userRoute from "./userRoute/index.js";

const router = express.Router();

router.use("/auth", authRoute);

router.use(protectedRoute);
router.use("/test", (req, res) => {
  res.json({ message: "Bạn đã truy cập vào route được bảo vệ!" });
});
router.use("/user", userRoute);
router.use("/category", categoriesRoute);

export default router;

import express from "express";

import categoryGroupRoute from "./categoryGroupsRoute/index.js";
import categoriesRoute from "./categoriesRoute/index.js";
import authRoute from "./authRoute/index.js";
import protectedRoute from "../middlewares/auth.middleware.js";
import userRoute from "./usersRoute/index.js";

const router = express.Router();

router.use("/auth", authRoute);

router.use(protectedRoute);
router.use("/test", (req, res) => {
  res.json({ message: "Bạn đã truy cập vào route được bảo vệ!" });
});
router.use("/users", userRoute);
router.use("/category-groups", categoryGroupRoute);
router.use("/categories", categoriesRoute);

export default router;

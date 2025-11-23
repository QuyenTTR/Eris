import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

async function protectedRoute(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Không có quyền truy cập" });
  }
  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }

    const user = await User.findById(decoded.userId).select("-hashedPassword");
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token đã hết hạn" });
    }
    res.status(500).json({ message: "Token không hợp lệ" });
    console.error("Lỗi khi gọi protectedRoute:", error);
  }
}

export default protectedRoute;

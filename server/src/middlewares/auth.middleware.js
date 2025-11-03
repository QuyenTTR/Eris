import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

function protectedRoute(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Không có quyền truy cập" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Không có quyền truy cập" });
    }

    jwt.verify(token, process.env.ACCESS_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token hết hạn hoặc không đúng" });
      }

      const user = await User.findById(decoded.userId).select("-hashedPassword");
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi kiểm tra quyền truy cập" });
    console.error("Lỗi khi gọi protectedRoute:", error);
  }
}

export default protectedRoute;

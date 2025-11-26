import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

async function protectedRoute(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization?.startsWith("Bearer ")) {
    throw new ApiError(401, "Không có quyền truy cập");
  }
  const accessToken = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    if (!decoded) {
      throw new ApiError(401, "Token không hợp lệ");
    }

    const user = await User.findById(decoded.userId).select("-hashedPassword");
    if (!user) {
      throw new ApiError(404, "Người dùng không tồn tại");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ApiError(401, "Access Token không hợp lệ"));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new ApiError(401, "Access Token đã hết hạn"));
    }
    next(error);
  }
}

export default protectedRoute;

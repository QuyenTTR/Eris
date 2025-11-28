import jwt from "jsonwebtoken";

import ApiError from "../utils/apiError.js";

function errorHandler(err, req, res, next) {
  // Nếu là lỗi ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  // Lỗi CastError của Mongoose
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({
      message: "ID không hợp lệ",
    });
  }

  // Lỗi Zod
  if (err.name === "ZodError") {
    return res.status(400).json({
      message: err.issues[0].message,
      errors: err.flatten().fieldErrors,
    });
  }

  // Lỗi Mongo duplicate key
  if (err.code === 11000) {
    const fieldName = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      message: `${fieldName} đã tồn tại`,
      errors: [{ field: fieldName }],
    });
  }

  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).json({ message: "JWT đã hết hạn" });
  }

  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({ message: "JWT không hợp lệ" });
  }

  // Lỗi không xác định
  console.error("-----------------------------------------------------------------------------------------------------\n");
  console.error("🔥🔥🔥🔥🔥🔥 Lỗi server:", err);

  return res.status(500).json({
    message: err.message || "Lỗi hệ thống",
  });
}

export default errorHandler;

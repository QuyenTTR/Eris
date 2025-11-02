import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Lỗi hệ thống!" });
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server đã chạy trên http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Kết nối database thất bại:", err);
    process.exit(1);
  });

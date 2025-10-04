import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import routes from "./routes/index.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Cho phép CORS
app.use(express.json());

app.use("/api", routes);

// Middleware xử lý lỗi cơ bản
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Đã có lỗi xảy ra!" });
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

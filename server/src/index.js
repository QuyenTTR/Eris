import express from "express";
import dotenv from "dotenv";

import routes from "./routes/index.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", routes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server đã chạy trên http://localhost:${port}`);
  });
});

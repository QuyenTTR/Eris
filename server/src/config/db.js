import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Liên kết CSDL thành công");
  } catch (error) {
    console.error("Lỗi kết nối CSDL:", error);
    process.exit(1); // Exit the process with failure
  }
}

export default connectDB;

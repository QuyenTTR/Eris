import { z } from "zod";

function validate(schema) {
  return (req, res, next) => {
    try {
      const result = schema.parse(req.body);
      req.body = result;

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dữ liệu không hợp lệ", error: error?.flatten().fieldErrors });
      }

      console.log("Lỗi khi validate:", error);
      res.status(500).json({ message: "Lỗi hệ thống" });
    }
  };
}

export default validate;

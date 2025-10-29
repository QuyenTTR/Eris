import bcrypt from "bcrypt";

import User from "../models/user.model.js";

class AuthController {
  async signUp(req, res) {
    try {
      let { fullname, email, username, password } = req.body;

      const hasUser = await User.findOne({ username });

      if (hasUser) {
        return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ fullname, email, username, password: hashedPassword });
      await user.save();

      res
        .status(201)
        .json({ message: "User created successfully", user: { fullname, email, username, password: hashedPassword } });
    } catch (error) {}
  }
}

export default new AuthController();

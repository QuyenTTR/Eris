import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import Session from "../models/session.model.js";

const ACCESS_TOKEN_EXPIRES_IN = "15s";
const REFRESH_TOKEN_EXPIRES_IN = 30 * 24 * 60 * 60 * 1000;

class AuthController {
  async register(req, res) {
    try {
      const { fullname, email, username, password } = req.body;

      const hasEmail = await User.findOne({ email });
      if (hasEmail) {
        return res.status(400).json({ message: "Email đã tồn tại" });
      }

      const hasUsername = await User.findOne({ username });
      if (hasUsername) {
        return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ fullname, email, username, hashedPassword });
      await user.save();

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi đăng ký" });
      console.error("Lỗi khi gọi signUp:", error);
    }
  }

  async login(req, res) {
    try {
      const { login, password } = req.body;

      const user = await User.findOne({
        $or: [{ username: login }, { email: login }],
      });
      if (!user) {
        return res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu chính xác" });
      }

      const isMatch = await bcrypt.compare(password, user.hashedPassword);
      if (!isMatch) {
        return res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu chính xác" });
      }

      const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      });
      const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN / 1000,
      });

      await Session.deleteMany({ userId: user._id });
      await Session.create({
        userId: user._id,
        refreshToken,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN),
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: REFRESH_TOKEN_EXPIRES_IN,
      });

      res.status(200).json({
        accessToken,
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi đăng nhập" });
      console.error("Lỗi khi gọi signIn:", error);
    }
  }

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        return res.status(401).json({ message: "Không có refresh token" });
      }

      const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

      const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      });

      res.status(200).json({ accessToken });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi làm mới token" });
      console.error("Lỗi khi gọi refreshToken:", error);
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      if (refreshToken) {
        await Session.findOneAndDelete({ refreshToken });
        res.clearCookie("refreshToken");
      }

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi đăng xuất" });
      console.error("Lỗi khi gọi signOut:", error);
    }
  }
}

export default new AuthController();

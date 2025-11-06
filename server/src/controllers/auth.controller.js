import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/user.model.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = 1000 * 60 * 60 * 24 * 30;

class AuthController {
  async signUp(req, res) {
    try {
      let { fullname, email, username, password } = req.body;

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

  async signIn(req, res) {
    try {
      let { login, password } = req.body;

      const user = await User.findOne({
        $or: [{ username: login }, { email: login }],
      });
      const isMatch = await bcrypt.compare(password, user.hashedPassword);

      if (!user || !isMatch) {
        return res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu chính xác" });
      }

      const accessToken = signAccessToken({ userId: user._id });
      const refreshToken = signRefreshToken({ userId: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: `Đăng nhập thành công`,
        accessToken,
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi đăng nhập" });
      console.error("Lỗi khi gọi signIn:", error);
    }
  }

  async refreshToken(req, res) {
    try {
      const token = req.cookies?.refreshToken;

      if (!token) {
        return res.status(401).json({ message: "Không có refresh token" });
      }

      const decoded = verifyRefreshToken(token);

      const accessToken = signAccessToken({ userId: decoded.userId });

      res.status(200).json({ accessToken });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi làm mới token" });
      console.error("Lỗi khi gọi refreshToken:", error);
    }
  }

  async signOut(req, res) {
    try {
      const { refreshToken } = req.cookies;
      if (refreshToken) {
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

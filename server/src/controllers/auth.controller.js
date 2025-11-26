import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import Session from "../models/session.model.js";
import ApiError from "../utils/apiError.js";

const ACCESS_TOKEN_EXPIRES_IN = "10m";
const REFRESH_TOKEN_EXPIRES_IN = 30 * 24 * 60 * 60 * 1000;

class AuthController {
  async register(req, res, next) {
    try {
      const { fullname, email, username, password } = req.body;

      const hasEmail = await User.findOne({ email });
      if (hasEmail) {
        throw new ApiError(400, "Email đã tồn tại");
      }

      const hasUsername = await User.findOne({ username });
      if (hasUsername) {
        throw new ApiError(400, "Tên đăng nhập đã tồn tại");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ fullname, email, username, hashedPassword });
      await user.save();

      res.status(201).json({ message: "Đăng ký thành công" });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body;

      const user = await User.findOne({
        $or: [{ username: login }, { email: login }],
      });
      if (!user) {
        throw new ApiError(401, "Tên đăng nhập hoặc mật khẩu không chính xác");
      }

      const isMatch = await bcrypt.compare(password, user.hashedPassword);
      if (!isMatch) {
        throw new ApiError(401, "Tên đăng nhập hoặc mật khẩu không chính xác");
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

      res.status(200).json({ message: "Đăng nhập thành công", accessToken });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (refreshToken) {
        await Session.findOneAndDelete({ refreshToken });
        res.clearCookie("refreshToken");
      }

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw new ApiError(401, "Không có refresh token");
      }
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

      const session = await Session.findOne({ refreshToken });
      if (!session) {
        throw new ApiError(401, "Phiên không hợp lệ");
      }

      if (session.expiresAt < new Date()) {
        throw new ApiError(401, "Phiên đã hết hạn");
      }

      const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      });

      res.status(200).json({ accessToken });
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return next(new ApiError(401, "Phiên không hợp lệ"));
      }
      if (error instanceof jwt.TokenExpiredError) {
        return next(new ApiError(401, "Phiên đã hết hạn"));
      }
      next(error);
    }
  }
}

export default new AuthController();

class UserController {
  async getMe(req, res) {
    try {
      const user = req.user;
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy thông tin người dùng" });
    }
  }
}

export default new UserController();

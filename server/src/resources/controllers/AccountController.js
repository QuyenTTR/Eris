import Account from '../models/Account.js';

class AccountController {
  async getAll(req, res) {
    try {
      const { isBlock } = req.query;
      let accounts;
      if (isBlock) {
        accounts = await Account.find({ isBlock: isBlock });
      } else {
        accounts = await Account.find({});
      }
      res.json({
        status: 1,
        data: accounts,
      });
    } catch (error) {
      res.status(400).json({
        status: 0,
        message: 'Lỗi server',
        error: error.message,
      });
    }
  }
}

export default new AccountController();

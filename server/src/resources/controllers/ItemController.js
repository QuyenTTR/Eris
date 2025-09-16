import fs from 'fs';
import path from 'path';

import Item from '../models/Item.js';

class ItemController {
  // [GET] /api/item/getAll
  async getAll(req, res) {
    try {
      const items = await Item.find({});
      res.json({
        status: 1,
        data: items,
      });
    } catch (error) {
      res.status(400).json({
        status: 0,
        message: 'Lỗi server',
        error: error.message,
      });
    }
  }

  // [POST] /api/item/create
  async store(req, res) {
    try {
      const item = new Item({
        name: req.body.name,
        price: req.body.price,
        image: `/img/${req.file.filename}`,
        categoryId: req.body.categoryId,
      });
      await item.save();
      res.json({
        status: 1,
        message: 'Thêm Mặt Hàng Mới Thành Công!',
      });
    } catch (error) {
      // console.error(error);
      res.status(400).json({
        status: 0,
        message: 'Thêm Mặt Hàng Thất Bại!',
        error: error.message,
      });
    }
  }

  // [PUT] /api/item/update/:id
  async updateId(req, res) {
    try {
      const { id } = req.params;

      const oldItem = await Item.findById(id);
      if (!oldItem) {
        return res.status(404).json({
          status: 0,
          message: 'Không tìm thấy mặt hàng',
        });
      }

      let updateData = {
        name: req.body.name,
        price: req.body.price,
        quantityLeft: req.body.quantityLeft,
      };
      // nếu có upload ảnh thì xóa ảnh cũ và cập nhật ảnh mới
      if (req.file) {
        if (oldItem.image) {
          // đường dẫn tuyệt đối đến file
          const oldImagePath = path.join(process.cwd(), 'src', 'public', oldItem.image);
          try {
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath); // xóa ảnh cũ
            }
          } catch (err) {
            console.error('Không thể xóa ảnh cũ:', err.message);
          }
        }

        updateData.image = `/img/${req.file.filename}`;
      }

      const item = await Item.findByIdAndUpdate(id, updateData, { new: true });

      if (!item) {
        return res.status(404).json({
          status: 0,
          message: 'Không tìm thấy mặt hàng',
        });
      }

      res.status(200).json({
        status: 1,
        message: 'Cập Nhật Thành Công!',
        data: item,
      });
    } catch (error) {
      res.status(400).json({
        status: 0,
        message: 'Cập Nhật Thất Bại!',
        error: error.message,
      });
    }
  }

  // [PUT] /api/item/updateStatus/:id
  async changeStatusId(req, res) {
    try {
      const { id } = req.params;
      const item = await Item.findById(id);
      if (!item) {
        return res.status(404).json({
          status: 0,
          message: 'Không tìm thấy mặt hàng',
        });
      }

      item.isStatus = !item.isStatus;
      await item.save();

      res.status(200).json({
        status: 1,
        message: 'Cập Nhật Trạng Thái Thành Công!',
      });
    } catch (error) {
      res.status(400).json({
        status: 0,
        message: 'Cập Nhật Trạng Thái Thất Bại!',
        error: error.message,
      });
    }
  }

  // [DELETE] /api/item/delete/:id
  async destroyId(req, res) {
    try {
      const { id } = req.params;
      const item = await Item.findByIdAndDelete(id);
      if (!item) {
        return res.status(404).json({
          status: 0,
          message: 'Không tìm thấy mặt hàng',
        });
      }
      res.status(200).json({
        status: 1,
        message: 'Xóa Mặt Hàng Thành Công',
      });
    } catch (error) {
      res.status(400).json({
        status: 0,
        message: 'Xóa Mặt Hàng Thất Bại',
        error: error.message,
      });
    }
  }
}

export default new ItemController();

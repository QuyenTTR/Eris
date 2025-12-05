import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

import ApiError from "../utils/apiError.js";

class ProductController {
  async getAll(req, res, next) {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { name, description, imageUrl, isStatus, price, unit, categoryId } = req.body;

      const category = await Category.findById(categoryId);
      if (!category) {
        throw new ApiError(404, "Danh mục không tồn tại");
      }

      const newProduct = new Product({ name, description, imageUrl, isStatus, price, unit, categoryId });
      await newProduct.save();

      res.status(201).json({ message: "Tạo sản phẩm thành công", product: newProduct });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });
      if (!updatedProduct) {
        throw new ApiError(404, "Sản phẩm không tồn tại");
      }

      res.status(200).json({
        message: "Cập nhật sản phẩm thành công",
        product: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async toggleStatus(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        throw new ApiError(404, "Sản phẩm không tồn tại");
      }
      product.isStatus = !product.isStatus * 1;
      await product.save();

      res.status(200).json({
        message: "Cập nhật trạng thái thành công",
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        throw new ApiError(404, "Sản phẩm không tồn tại");
      }

      res.status(200).json({
        message: "Xóa sản phẩm thành công",
        product: deletedProduct,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();

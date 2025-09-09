import Category from '../models/Category.js'

class CategoryController {

    // [GET] /api/category/getAll
    async getAll(req, res) {

        try {
            const { isStatus } = req.query;
            let categories;
            if(isStatus) {
                categories = await Category.find({isStatus: isStatus});
            } else {
                categories = await Category.find({});
            }
            res.json({
                status: 1,
                data: categories
            });
        } catch (error) {
            res.status(400).json({
                status: 0,
                message: "Lỗi server",
                error: error.message
            });
        }
    }

    async store(req, res) {
        try {
            const category = new Category({
                name: req.body.name,
            })
            await category.save();
            res.json({
                status: 1,
                message: "Thêm Danh Mục Mới Thành Công!",
            });
        } catch (error) {
            res.status(400).json({
                status: 0,
                message: "Thêm Danh Mục Thất Bại!",
                error: error.message
            });
        }
    }

    async changeStatusId(req, res) {
        try {
            const { id } = req.params;
            const category = await Category.findById(id);
            if (!category) {
                return res.status(404).json({
                    status: 0,
                    message: "Không tìm thấy danh mục"
                });
            }

            category.isStatus = !category.isStatus;
            await category.save();

            res.status(200).json({
                status: 1,
                message: "Cập Nhật Trạng Thái Thành Công!",
            })
        } catch (error) {
            res.status(400).json({
                status: 0,
                message: "Cập Nhật Trạng Thái Thất Bại!",
                error: error.message
            });
        }
    }

    async destroyId(req, res) {
        try {
            const { id } = req.params;
            const category = await Category.findByIdAndDelete(id);
            if (!category) {
                return res.status(404).json({
                    status: 0,
                    message: "Không tìm danh mục hàng"
                });
            }
            res.status(200).json({
                status: 1,
                message: "Xóa Danh Mục Thành Công",
            });
        } catch (error) {
            res.status(400).json({
                status: 0,
                message: "Xóa Danh Mục Thất Bại",
                error: error.message
            });
        }
    }
}

export default new CategoryController
import Item from '../../models/Item.js'

class ItemController {

    // [GET] /api/item/getAll
    async getAll(req, res) {
        try {
            const items = await Item.find({});
            res.json({
                status: 1,
                data: items
            });
        } catch (error) {
            res.status(400).json({
                status: 0,
                message: "Lỗi server",
                error: error.message
            });
        }
    }

    
}

export default new ItemController();
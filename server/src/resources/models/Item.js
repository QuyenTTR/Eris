import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Item = new Schema({
    id: ObjectId,
    name: { type: String, minLength: 3, maxLength: 50, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    categoryId: { type: String, required: true },
    isStatus: { type: Number, default: 1 },
    quantityLeft: { type: Number, min: 0, default: 0 },
}, {
    timestamps: true
});

// Item.plugin(mongooseDelete, {
//     deletedAt: true,
//     overrideMethods: "all"
// });

export default mongoose.model('Item', Item);
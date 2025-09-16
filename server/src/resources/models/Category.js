import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Category = new Schema(
  {
    id: ObjectId,
    name: { type: String, minLength: 3, maxLength: 50, required: true },
    isStatus: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

// Category.plugin(mongooseDelete, {
//     deletedAt: true,
//     overrideMethods: "all"
// });

export default mongoose.model('Category', Category);

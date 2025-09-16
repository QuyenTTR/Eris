import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Account = new Schema(
  {
    id: ObjectId,
    email: { type: String, minLength: 5, maxLength: 50, required: true },
    password: { type: String, minLength: 8, maxLength: 50, required: true },
    name: { type: String, minLength: 3, maxLength: 50, required: true },
    avatar: { type: String },
    isBlock: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Account.plugin(mongooseDelete, {
//     deletedAt: true,
//     overrideMethods: "all"
// });

export default mongoose.model('Account', Account);

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Item = new Schema({
  id: ObjectId,
  name: { type: String, minLength: 3, maxLength: 50 },
  price: Number,
  image: String,
  isStatus: { type: Number, default: 1 },
  quantityLeft: { type: Number, min: 0 }
});

export default mongoose.model('Item', Item);
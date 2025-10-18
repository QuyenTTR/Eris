import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Category = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 50 },
    isStatus: { type: Number, default: 0 },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Category", Category);

export default model;

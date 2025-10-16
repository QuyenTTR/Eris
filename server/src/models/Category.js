import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Category = new Schema(
  {
    name: { type: String, required: true, trim: true },
    isStatus: { type: Number, default: 1 },
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

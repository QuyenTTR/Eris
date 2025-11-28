import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Category = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    colorHex: {
      type: String,
      trim: true,
      maxlength: 7,
      default: "",
    },
    isStatus: {
      type: Number,
      default: 0,
    },
    categoryGroupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryGroup",
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Category", Category);

export default model;

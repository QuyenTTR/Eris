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
    isStatus: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Category", Category);

export default model;

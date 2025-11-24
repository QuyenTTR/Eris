import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategoryGroup = new Schema(
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
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("CategoryGroup", CategoryGroup);

export default model;

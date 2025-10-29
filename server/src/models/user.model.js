import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("User", User);

export default model;

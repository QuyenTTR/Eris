import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Session = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

Session.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const model = mongoose.model("Session", Session);
export default model;

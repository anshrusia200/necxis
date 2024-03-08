import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
    comments: [
      {
        comment: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.models.Post || mongoose.model("Post", PostSchema);

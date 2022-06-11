const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Object,
      default: "new",
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: true }, // this will make mongoose to add timestamp (createdAt and updatedAt) fields automatically
  }
);

module.exports = mongoose.model("User", userSchema);

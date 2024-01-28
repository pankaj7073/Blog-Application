const mongoose = require("mongoose");
const getTime = require("../config/getTime");

const postModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  category: {
    type: Array,
    default: [],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: String,
      },
      timestamp: { type: Date, default: getTime() },
    },
  ],
  createdAt: {
    type: Date,
    default: getTime(),
  },
});

// Date and time
// postModel.pre("save", function (next) {
//   this.createdAt = getTime();
//   next();
// });

const post = new mongoose.model("Post", postModel);

module.exports = post;

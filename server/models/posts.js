const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  postMedia: {
    imageLink: {
        type: String,
    },
    videoLink: {
      type: String,
    },
    required: true,
  },
  likes: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  shared: {
    type: Number,
  },
  caption: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

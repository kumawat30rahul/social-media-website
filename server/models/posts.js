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
  },
  isImage: {
    type: Boolean,
  },
  isVideo: {
    type: Boolean,
  },
  likes: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  createDate: {
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

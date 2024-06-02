const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  bio: {
    type: String,
  },
  posts: {
    type: Array,
  },
  followers: {
    type: Array,
  },
  following: {
    type: Array,
  },
  profilePicture: {
    type: String,
  },
  savedPosts: {
    type: Array,
  },
  sharedPosts: {   
    type: Array,
  },
  commentedPosts: {
    type: Array,
  },
  likedPosts: {
    type: Array,
  },
});

const UserDetail = mongoose.model("UserDetails", userDetailsSchema);
module.exports = UserDetail;

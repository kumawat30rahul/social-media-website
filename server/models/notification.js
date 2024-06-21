const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  senderUsername: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
  },
  receiverId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
  },
  notifications: {
    type: String,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    postId:{
        type: String,
    },
    notifications: {
        type: String,
    },
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
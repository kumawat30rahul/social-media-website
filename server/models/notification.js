const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    notifications: {
        type: Array,
    },
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
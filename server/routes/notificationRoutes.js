const express = require("express");
const Notification = require("../models/notification");
const UserDetail = require("../models/userDetail");

const notificationRouter = express.Router();

notificationRouter.post("/create", async (req, res) => {
  const { senderId, receiverId, postId, notifications } = req.body;
  if (!senderId) {
    return res.status(400).json({ message: "Missing senderId" });
  }
  if (!receiverId) {
    return res.status(400).json({ message: "Missing receiverId" });
  }

  try {
    const notificationObj = await Notification.findOne().sort({ _id: -1 });

    let idNumber = notificationObj
      ? parseInt(notificationObj.notificationId.slice(1))
      : 0;
    idNumber++;
    const newIdNumber = String(idNumber).padStart(5, "0");
    const newNotificationId = "N" + newIdNumber;
    const senderUserDetails = await UserDetail.findOne({ userId: senderId });
    const notification = new Notification({
      notificationId: newNotificationId,
      senderId,
      receiverId,
      postId,
      notifications,
      senderUsername: senderUserDetails?.username,
      senderName: senderUserDetails?.name,
    });

    await notification.save();
    return res.status(201).json({
      message: "Notification Created Successfully",
      status: "success",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
});

// Get all notifications
notificationRouter.get("/get-all/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ receiverId: userId });
    const userIds = notifications.map((notification) => notification.senderId);
    const userDetails = await UserDetail.find({ userId: { $in: userIds } });

    const newNotifications = notifications.map((notification) => {
      const userDetail = userDetails.find(
        (userDetail) => userDetail.userId === notification.senderId
      );
      return {
        notificationId: notification.notificationId,
        senderId: notification.senderId,
        receiverId: notification.receiverId,
        postId: notification.postId,
        notifications: notification.notifications,
        isRead: notification.isRead,
        senderUsername: userDetail.username,
        senderName: userDetail.name,
        senderImage: userDetail.profilePicture,
      };
    });

    return res.status(200).json({
      newNotifications,
      status: "success",
      message: "Notifications fetched successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
});

//change to read
notificationRouter.patch("/read/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findOne({ notificationId: id });
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    notification.isRead = true;
    await notification.save();
    return res
      .status(200)
      .json({ message: "Notification updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
});

//delete notification
notificationRouter.post("/delete", async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  try {
    const notification = await Notification.findOneAndDelete({
      notificationId: id,
    });
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    return res
      .status(200)
      .json({ message: "Notification deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
});

module.exports = notificationRouter;

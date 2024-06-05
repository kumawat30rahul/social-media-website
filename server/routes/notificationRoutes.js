const express = require("express");
const Notification = require("../models/notification");

const notificationRouter = express.Router();

notificationRouter.post("/create", async (req, res) => {
    const {senderId,receiverId,postId,notifications} = req.body;
    if(!senderId){
        return res.status(400).json({message:"Missing senderId"});
    }
    if(!receiverId){
        return res.status(400).json({message:"Missing receiverId"});
    }
    try {
        const notification = new Notification({
            senderId,
            receiverId,
            postId,
            notifications,
        })

        await notification.save();
        return res.status(201).json({message:"Notification Created Successfully",status:"success"});
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",error:error});
    }
});

module.exports = notificationRouter;
const express = require("express");
const Post = require("../models/posts");
const UserDetail = require("../models/userDetail");

const postRouter = express.Router();

postRouter.post("/create", async (req, res) => {
  const { userId, postId, mediaLink, isImage, isVideo, caption, createdDate } =
    req.body;

  if (!userId) {
    return res.status(400).json({ message: "Missing UserId" });
  }

  if (!postId) {
    return res.status(400).json({ message: "Missing PostId" });
  }

  if (!mediaLink) {
    return res.status(400).json({ message: "Missing MediaLink" });
  }

  if (!isImage && !isVideo) {
    return res.status(400).json({ message: "Missing Media Type" });
  }

  if (!createdDate) {
    return res.status(400).json({ message: "Missing createdDate" });
  }

  try {
    const post = new Post({
      userId,
      postId,
      mediaLink,
      isImage,
      isVideo,
      caption,
      createdDate,
    });

    const userDetails = await UserDetail.findOne({ userId: userId });
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    userDetails.posts.push(postId);
    await post.save();
    await userDetails.save();
    return res
      .status(201)
      .json({ message: "Post Created Successfully", status: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

postRouter.post("/update-like", async (req, res) => {
  const { likedUserId, postId } = req.body;

  if (!likedUserId) {
    return res.status(400).json({ message: "Missing likedUserId" });
  }

  if (!postId) {
    return res.status(400).json({ message: "Missing PostId" });
  }

  try {
    const post = await Post.findOne({ postId: postId });
    const userDetails = await UserDetail.findOne({ userId: likedUserId });
    if (!userDetails) {
      return res.status(404).json({ message: "User Details not found" });
    }

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post?.likes?.includes(likedUserId)) {
      post.likes = post.likes.filter((id) => id !== likedUserId);
      userDetails.likedPosts = userDetails.likedPosts.filter((id) => id !== likedUserId);
    } else {
      const notification = new Notification({
        senderId: likedUserId,
        receiverId: post?.userId,
        postId: postId,
        notifications: "liked your post",
      });

      console.log({notification});

      userDetails.likedPosts.push(postId);
      post.likes.push(likedUserId);
      await notification.save();
    }
    
    console.log({post, userDetails});
    await userDetails.save();
    await post.save();
    return res.status(200).json({ message: "Post Like updated Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
});

postRouter.post("/update-comment", async (req, res) => {
  const { commentedUserId, postId, comment } = req.body;

  if (!commentedUserId) {
    return res.status(400).json({ message: "Missing commentedUserId" });
  }

  if (!postId) {
    return res.status(400).json({ message: "Missing PostId" });
  }

  if (!comment) {
    return res.status(400).json({ message: "Missing Comment" });
  }

  try {
    const post = await Post.findOne({ postId: postId });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({ commentedUserId, comment });

    await post.save();
    return res
      .status(200)
      .json({ message: "Post Comment updated Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
});

//save post
postRouter.post("/save-post", async (req, res) => {
  const { userId, postId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  if (!postId) {
    return res.status(400).json({ message: "Missing postId" });
  }

  try {
    const userDetails = await UserDetail.findOne({ userId: userId });

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    userDetails.savedPosts.push(postId);
    await userDetails.save();
    return res.status(200).json({ message: "Post saved successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
});

module.exports = postRouter;

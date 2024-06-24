const express = require("express");
const Post = require("../models/posts");
const UserDetail = require("../models/userDetail");
const Notification = require("../models/notification");
// const cloudinary = require("../utils/cloudinary");
// const upload = require("../middlewares/multer");

const postRouter = express.Router();

// postRouter.post("/create", upload.single("mediaLink"), async (req, res) => {
//   const { userId, isImage, isVideo, caption, createdDate } = req.body;

//   if (!userId) {
//     return res.status(400).json({ message: "Missing UserId" });
//   }

//   if (!req?.file) {
//     return res.status(400).json({ message: "Missing MediaLink" });
//   }

//   if (!isImage && !isVideo) {
//     return res.status(400).json({ message: "Missing Media Type" });
//   }

//   if (!createdDate) {
//     return res.status(400).json({ message: "Missing createdDate" });
//   }

//   try {
//     const lastPost = await Post.findOne().sort({ _id: -1 });
//     let idNumber = lastPost ? parseInt(lastPost.postId.slice(1)) : 0;
//     idNumber++;
//     const newIdNumber = String(idNumber).padStart(5, "0");
//     const newPostId = "P" + newIdNumber;

//     let imageLink;
//     // try {
//     //   const result = await cloudinary.uploader.upload(req?.file.path);
//     //   console.log(result);
//     //   imageLink = result.secure_url;
//     // } catch (error) {
//     //   console.log(error);
//     //   return res
//     //     .status(500)
//     //     .json({
//     //       message: "Internal Server Error from cloudinary",
//     //       error: error,
//     //     });
//     // }
//     // console.log({ imageUrl });

//     const post = new Post({
//       userId,
//       postId: newPostId,
//       postMedia: {
//         imageLink: req?.file?.path,
//         videoLink: null,
//       },
//       isImage,
//       isVideo,
//       caption,
//       createdDate,
//     });

//     const userDetails = await UserDetail.findOne({ userId: userId });
//     if (!userDetails) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     userDetails.posts.push(newPostId);
//     await post.save();
//     await userDetails.save();
//     return res
//       .status(201)
//       .json({ message: "Post Created Successfully", status: "success" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error });
//   }

//   return;
// });

//update post
postRouter.patch("/update", async (req, res) => {
  const { postId, caption, mediaLink, isImage } = req.body;

  if (!postId) {
    return res.status(400).json({ message: "Missing PostId" });
  }

  try {
    const post = await Post.findOne({ postId: postId });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (caption) {
      post.caption = caption;
    }
    post.postMedia.imageLink = mediaLink;
    post.postMedia.videoLink = !isImage ? mediaLink : null;
    await post.save();
    return res
      .status(200)
      .json({ message: "Post Updated Successfully", status: "success" });
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
      userDetails.likedPosts = userDetails.likedPosts.filter(
        (id) => id !== likedUserId
      );
    } else {
      const notification = new Notification({
        senderId: likedUserId,
        receiverId: post?.userId,
        postId: postId,
        notifications: "liked your post",
        senderUsername: userDetails?.username,
        senderName: userDetails?.name,
      });

      userDetails?.likedPosts?.push(postId);
      post?.likes?.push(likedUserId);
      await notification.save();
    }

    console.log({ post, userDetails });
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
    const userDetails = await UserDetail.findOne({ userId: commentedUserId });

    if (!userDetails) {
      return res.status(404).json({ message: "Commented User not found" });
    }

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({ userName: userDetails?.username, comment });

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
    const post = await Post.findOne({ postId: postId });

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (userDetails?.savedPosts?.includes(postId)) {
      userDetails.savedPosts = userDetails.savedPosts.filter(
        (id) => id !== postId
      );
      await userDetails.save();
      return res.status(200).json({ message: "Post unsaved successfully" });
    } else {
      userDetails.savedPosts.push(postId);
      const notification = new Notification({
        senderId: userId,
        receiverId: post?.userId,
        postId: postId,
        notifications: "saved your post",
        senderUsername: userDetails?.username,
        senderName: userDetails?.name,
      });
      await notification.save();
      await userDetails.save();
      return res.status(200).json({ message: "Post saved successfully" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
});

//get all posts
postRouter.get("/get-all/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserDetail.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let followersIdArray = user?.following?.map((userId) => userId);
    const posts = await Post.find({ userId: { $in: followersIdArray } });
    const allPostUserId = posts.map((post) => post.userId);
    const findAllPostsUser = await UserDetail.find({
      userId: { $in: allPostUserId },
    });

    const postData = posts
      .map((post) => {
        const user = findAllPostsUser.find(
          (user) => user.userId === post.userId
        );

        return {
          ...post._doc,
          user: {
            userId: user?.userId || "NA",
            userName: user?.username || "NA",
            profilePic: user?.profilePic || "NA",
            savedPosts: user?.savedPosts || [],
          },
        };
      })
      .sort((a, b) => b.createDate - a.createDate);
    return res.status(200).json({ postData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
});

//get saved posts
postRouter.get("/get-saved-posts/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserDetail.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const postIds = user.savedPosts;

    const posts = await Post.find({ postId: { $in: postIds } });
    return res.status(200).json({ posts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
});

//share post
postRouter.post("/share-post", async (req, res) => {
  const { userId, postId, sharedUserId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "Invalid user ID", status: "error" });
  }

  if (!postId) {
    return res
      .status(400)
      .json({ message: "Invalid post ID", status: "error" });
  }

  if (!sharedUserId) {
    return res
      .status(400)
      .json({ message: "Invalid shared user ID", status: "error" });
  }

  try {
    const user = await UserDetail.findOne({ userId });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", status: "error" });
    }

    for (let i = 0; i < sharedUserId?.length; i++) {
      const notification = new Notification({
        senderId: userId,
        receiverId: sharedUserId[i],
        postId: postId,
        notifications: "shared a post with you",
        senderUsername: user?.username,
        senderName: user?.name,
      });
      await notification.save();
    }

    user?.sharedPosts?.push(postId);
    await user.save();
    return res
      .status(200)
      .json({ message: "Post shared successfully", status: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
});

//get all posts
postRouter.get("/get-all-posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({ posts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
});

//get all post by post id
postRouter.post("/get-posts-by-ids", async (req, res) => {
  const postIds = req.body;

  if (postIds?.length === 0) {
    return res.status(400).json({ message: "Invalid postIds" });
  }

  console.log({ postIds });
  try {
    const posts = await Post.find({ postId: { $in: postIds } });

    return res.status(200).json({ posts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
});

module.exports = postRouter;

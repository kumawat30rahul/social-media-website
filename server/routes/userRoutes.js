const express = require("express");
const User = require("../models/user");
const {
  usernameValidation,
  passwordValidation,
  emailValidation,
  phoneNumberValidation,
} = require("../utils/validation");
const UserDetail = require("../models/userDetail");
const Notification = require("../models/notification");
const bcrypt = require("bcrypt");

const userRoutes = express.Router();

//register user
userRoutes.post("/register", async (req, res) => {
  const { username, password, name, email } = req.body;

  if (!username && !password && !name && !email) {
    return res
      .status(400)
      .json({ message: "All fields are required", status: "error" });
  } else if (usernameValidation(username) === false) {
    return res
      .status(400)
      .json({ message: "Invalid username", status: "error" });
  } else if (passwordValidation(password) === false) {
    return res
      .status(400)
      .json({ message: "Invalid password", status: "error" });
  } else if (!name) {
    return res
      .status(400)
      .json({ message: "Provide proper name", status: "error" });
  } else if (emailValidation(email) === false) {
    return res
      .status(400)
      .json({ message: "Provide proper email", status: "error" });
  }

  try {
    const emailUser = await User.findOne({ email }); // check if email already exists
    const usernameUser = await User.findOne({ username }); // check if username already exists

    if (emailUser) {
      return res
        .status(400)
        .json({ message: "Email already exists", status: "error" });
    }
    if (usernameUser) {
      return res
        .status(400)
        .json({ message: "Username already exists", status: "error" });
    }
    const lastUser = await User.findOne().sort({ _id: -1 });
    let idNumber = lastUser ? parseInt(lastUser.userId.slice(1)) : 0;
    idNumber++;
    const newIdNumber = String(idNumber).padStart(5, "0");
    const newUserId = "U" + newIdNumber;
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUND)
    );

    const user = new User({
      userId: newUserId,
      username,
      password: hashedPassword,
      name,
      email,
    });

    const userDetails = new UserDetail({
      userId: newUserId,
      name,
      username,
      password,
      email,
      bio: "",
    });

    await user.save();
    await userDetails.save();
    return res
      .status(201)
      .json({ message: "User registered successfully", status: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
});

//username check
userRoutes.post("/username-check", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ message: "Invalid username", status: "error" });
  }

  try {
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(200)
        .json({ message: "Username already exists", status: "error" });
    } else {
      return res
        .status(200)
        .json({ message: "Username is available", status: "success" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
});

//get users
userRoutes.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users, status: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
});

//update user details
userRoutes.patch("/update", async (req, res) => {
  const { userId, bio, username, name } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "Invalid user ID", status: "error" });
  }

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", status: "error" });
    }

    const userDetails = await UserDetail.findOne({ userId });

    if (!userDetails) {
      return res
        .status(404)
        .json({ message: "User details not found", status: "error" });
    }

    if (bio) {
      userDetails.bio = bio;
    }

    if (username) {
      userDetails.username = username;
    }

    if (name) {
      userDetails.name = name;
    }

    await userDetails.save();

    return res.status(200).json({
      message: "User details updated successfully",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
});

//get user details
userRoutes.get("/user-details/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "Invalid user ID", status: "error" });
  }

  try {
    const userDetails = await UserDetail.findOne({ userId });

    if (!userDetails) {
      return res
        .status(404)
        .json({ message: "User details not found", status: "error" });
    }

    return res.status(200).json({ userDetails, status: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
});

//get followers
userRoutes.get("/followers/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "Invalid user ID", status: "error" });
  }

  try {
    const user = await UserDetail.findOne({ userId });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", status: "error" });
    }

    const followers = await UserDetail.find({
      userId: { $in: user.followers },
    });

    const follwersDetails = followers.map((follower) => {
      return {
        userId: follower.userId,
        name: follower.name,
        username: follower.username,
        // bio: follower.bio,
      };
    });

    return res.status(200).json({ follwersDetails, status: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
});

//get all userdetails
userRoutes.get("/all-user-details", async (req, res) => {
  try {
    const userdetails = await UserDetail.find();
    return res.status(200).json({ userdetails, status: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
});

//follow user
userRoutes.patch("/follow", async (req, res) => {
  const { userId, followId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "Invalid user ID", status: "error" });
  }

  if (!followId) {
    return res
      .status(400)
      .json({ message: "Invalid follow ID", status: "error" });
  }

  try {
    const user = await UserDetail.findOne({ userId });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", status: "error" });
    }

    const followUser = await UserDetail.findOne({ userId: followId });

    if (!followUser) {
      return res
        .status(404)
        .json({ message: "Follow user not found", status: "error" });
    }

    if (user?.following?.includes(followId)) {
      const followingIndex = user.following.indexOf(followId);
      user.following.splice(followingIndex, 1);
      const followerIndex = followUser.followers.indexOf(userId);
      followUser.followers.splice(followerIndex, 1);
    } else {
      user.following.push(followId);
      followUser.followers.push(userId);
      const notification = new Notification({
        senderId: userId,
        receiverId: followId,
        notifications: "started following you",
        isRead: false,
      });

      await notification.save();
    }

    await user.save();
    await followUser.save();

    return res
      .status(200)
      .json({ message: "User followed successfully", status: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
});

module.exports = userRoutes;

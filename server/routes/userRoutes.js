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
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");
const upload = require("../middlewares/multer");
const cloudinary = require("../utils/cloudinary");

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

//login user
userRoutes.post("/login", async (req, res) => {
  const { password, loginId } = req.body;

  if (!loginId && !password) {
    return res
      .status(400)
      .json({ message: "All fields are required", status: "error" });
  }

  try {
    let user;
    if (loginId.includes("@")) {
      user = await User.findOne({ email: loginId });
    } else {
      user = await User.findOne({ username: loginId });
    }
    console.log(user);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", status: "error" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid password", status: "error" });
    }

    const token = jwt.sign(
      {
        loginTime: new Date(),
        username: user?.username,
        email: user?.email,
      },
      process.env.SALT_ROUND
    );

    return res.status(200).json({
      message: "User logged in successfully",
      userDetails: {
        userId: user.userId,
        username: user.username,
        name: user.name,
        email: user.email,
        token: token,
      },
      status: "success",
    });
  } catch (error) {
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

    let followed;
    if (user?.following?.includes(followId)) {
      const followingIndex = user.following.indexOf(followId);
      user.following.splice(followingIndex, 1);
      const followerIndex = followUser.followers.indexOf(userId);
      followUser.followers.splice(followerIndex, 1);
      followed = false;
    } else {
      user.following.push(followId);
      followUser.followers.push(userId);

      const notification = {
        senderId: userId,
        receiverId: followId,
        notifications: "started following you",
        senderUsername: user?.username,
        senderName: user?.name,
        isRead: false,
      };
      axios
        .post(`${process.env.VITE_PROD_URL}/notification/create`, notification)
        .then((response) => {
          console.log("Notification created successfully", { response });
        })
        .catch((error) => {
          console.log("Notification not created successfully", { error });
        });
      followed = true;
    }

    await user.save();
    await followUser.save();

    return res.status(200).json({
      message: "User followed successfully",
      status: "success",
      didFollow: followed,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
});

//get all followers
userRoutes.get("/get-all-followers/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "Invalid user ID", status: "error" });
  }

  try {
    const user = await UserDetail.findOne({ userId });
    console.log(user);
    const allFollowers = user.following;

    return res.status(200).json({ allFollowers, status: "success" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
});

//upload image
userRoutes.post(
  "/upload-image",
  upload.single("mediaLink"),
  async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "Invalid user ID", status: "error" });
    }

    try {
      let imageLink;
      try {
        const result = await cloudinary.uploader.upload(req?.file.path);
        console.log(result);
        imageLink = result.secure_url;
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Internal Server Error from cloudinary",
          error: error,
        });
      }
      const user = await UserDetail.findOne({ userId });

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", status: "error" });
      }

      user.profilePicture = imageLink;

      await user.save();

      return res.status(200).json({
        message: "Image uploaded successfully",
        status: "success",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error });
    }
  }
);

//edit user details
userRoutes.patch("/edit-user", async (req, res) => {
  const { userId, name, username, bio } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "Invalid user ID", status: "error" });
  }

  try {
    const user = await UserDetail.findOne({ userId });
    const logedInUser = await User.findOne({ userId });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", status: "error" });
    }

    if (name) {
      user.name = name;
      logedInUser.name = name;
    }

    if (username) {
      user.username = username;
      logedInUser.username = username;
    }

    if (bio) {
      user.bio = bio;
    }

    await user.save();
    await logedInUser.save();

    return res.status(200).json({
      message: "User details updated successfully",
      status: "success",
      userDetails: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
});

module.exports = userRoutes;

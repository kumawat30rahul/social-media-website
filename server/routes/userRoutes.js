const express = require("express");
const User = require("../models/user");
const {
  usernameValidation,
  passwordValidation,
  emailValidation,
  phoneNumberValidation,
} = require("../utils/validation");
const UserDetail = require("../models/userDetail");

const userRoutes = express.Router();

//register user
userRoutes.post("/register", async (req, res) => {
  const { username, password, name, email, phoneNumber, userId } = req.body;

  if (!username && !password && !name && !email && !phoneNumber && !userId) {
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
  } else if (phoneNumberValidation(phoneNumber) === false) {
    return res
      .status(400)
      .json({ message: "Provide proper phone number", status: "error" });
  } else if (!userId) {
    return res
      .status(400)
      .json({ message: "Invalid user ID", status: "error" });
  }

  try {
    const emailUser = await User.findOne({ email }); // check if email already exists
    const contactUser = await User.findOne({ phoneNumber }); // check if contact already exists
    const usernameUser = await User.findOne({ username }); // check if username already exists
    const userWithUserId = await User.findOne({ userId }); // check if userId already exists

    if (emailUser) {
      return res
        .status(400)
        .json({ message: "Email already exists", status: "error" });
    }
    if (contactUser) {
      return res
        .status(400)
        .json({ message: "Phone number already exists", status: "error" });
    }
    if (usernameUser) {
      return res
        .status(400)
        .json({ message: "Username already exists", status: "error" });
    }
    if (userWithUserId) {
      return res
        .status(400)
        .json({ message: "User ID already exists", status: "error" });
    }

    const user = new User({
      userId,
      username,
      password,
      name,
      email,
      phoneNumber,
    });

    const userDetails = new UserDetail({
      userId,
      name,
      username,
      password,
      email,
      phoneNumber,
      bio: "",
    });

    await user.save();
    try {
      await userDetails.save();
    } catch (error) {
      console.log(error);
    }

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

    return res
      .status(200)
      .json({
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

module.exports = userRoutes;

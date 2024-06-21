const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const postRouter = require("./routes/postsRoutes");
const notificationRouter = require("./routes/notificationRoutes");
const imageRouter = require("./routes/imageRouter");
const bodyParser = require("body-parser");
const Grid = require("gridfs-stream").Grid;
// const dotenv = require("dotenv");

const app = express();
// dotenv.config();

//Env variables
const port = process.env.PORT || 5001;
const mongo_uri = process.env.MONGO_URI;

//Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to MongoDB

//cors
const corsoptions = {
  origin: "http://localhost:5173", // restrict calls to those this address
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // allow these methods
  credentials: true, // allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 204,
};

app.use(cors(corsoptions));

//connections
mongoose
  .connect(mongo_uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

//Routes
app.use("/user", userRoutes);
app.use("/post", postRouter);
app.use("/notification", notificationRouter);
app.use("/image", imageRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// node --env-file=.env app.js

// V4ShzGVXi42Rm8z0

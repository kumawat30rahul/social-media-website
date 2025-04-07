const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const postRouter = require("./routes/postsRoutes");
const notificationRouter = require("./routes/notificationRoutes");
const bodyParser = require("body-parser");

const app = express();

//Env variables
const port = process.env.PORT || 5001;
const mongo_uri = process.env.MONGO_URI;

//Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/tmp"));
// app.use(express.static("tmp"));
//cors
const corsoptions = {
  origin: [
    "http://localhost:5173/",
    "http://localhost:5173",
    "http://localhost:4173/",
    "http://localhost:4173",
    "https://social-media-website-silk.vercel.app/",
    "https://social-media-website-silk.vercel.app",
    "https://social-media-website-theta.vercel.app/",
    "https://social-media-website-theta.vercel.app",
    "https://social-media-website-kpi1npjyk-rahul-kumawats-projects-3a6abe2d.vercel.app/",
    "https://social-media-website-kpi1npjyk-rahul-kumawats-projects-3a6abe2d.vercel.app",
  ], // restrict calls to those this address
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use((req, res, next) => {
  next();
});
app.use(cors(corsoptions));

//connections
mongoose
  .connect(mongo_uri)
  .then((client) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

//Routes
app.use("/user", userRoutes);
app.use("/post", postRouter);
app.use("/notification", notificationRouter);
// app.use("/image", imageRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// node --env-file=.env app.js

// V4ShzGVXi42Rm8z0

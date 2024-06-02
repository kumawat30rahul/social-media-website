const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cors = require('cors');


const app = express();

//Env variables
const port = process.env.PORT || 5001;
const mongo_uri = process.env.MONGO_URI;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect to MongoDB

//cors
const corsoptions = {
    origin: 'http://localhost:5173', // restrict calls to those this address
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // allow these methods
    credentials: true, // allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204
}

app.use(cors(corsoptions));

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

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// node --env-file=.env app.js

// V4ShzGVXi42Rm8z0

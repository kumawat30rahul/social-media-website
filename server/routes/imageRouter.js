// const express = require("express");
// const multer = require("multer");

// const imageRouter = express.Router();
// const upload = multer({ dest: "uploads/" });

// imageRouter.post("/create", upload.single("image"), async (req, res) => {
//   const { imageName, imageLink, userId } = req.body;
//   console.log(req.body);
//   return res.status(200).json({ message: "Image Created Successfully" });
//   //   if (!imageName) {
//   //     return res.status(400).json({ message: "Missing Image Name" });
//   //   }
//   //   if (!imageLink) {
//   //     return res.status(400).json({ message: "Missing Image Link" });
//   //   }
//   //   if (!userId) {
//   //     return res.status(400).json({ message: "Missing User Id" });
//   //   }
//   //   try {
//   //     const image = new Image({
//   //       imageName,
//   //       imageLink,
//   //       userId,
//   //     });
//   //     await image.save();
//   //     await image.save();
//   //     return res
//   //       .status(201)
//   //       .json({
//   //         message: "Image Created Successfully",
//   //         imageLink: image.imageLink,
//   //         status: "success",
//   //       });
//   //   } catch (error) {
//   //     return res
//   //       .status(500)
//   //       .json({ message: "Internal Server Error", error: error });
//   //   }
// });

// //get images
// imageRouter.get("/images/:userId", async (req, res) => {
//   const { userId } = req.params;
//   if (!userId) {
//     return res.status(400).json({ message: "Missing User Id" });
//   }
//   try {
//     const images = await Image.find({ userId });
//     return res.status(200).json({ images, status: "success" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error });
//   }
// });

// module.exports = imageRouter;

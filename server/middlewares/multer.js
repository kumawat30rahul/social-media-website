const multer = require("multer");
const mkdirp = require("mkdirp");

const uploadDir = "/tmp/uploads";

mkdirp.sync(uploadDir);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

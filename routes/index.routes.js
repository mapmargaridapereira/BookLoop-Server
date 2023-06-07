const express = require("express");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/upload", fileUploader.single("profileImg", "bookImg"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded"));
    return;
  }

  res.json({ fileUrl: req.file.path });
});

module.exports = router;

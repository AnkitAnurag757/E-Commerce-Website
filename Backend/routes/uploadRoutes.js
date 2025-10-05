const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const router = express.Router();

require("dotenv").config();

//cloudinary configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//MUlter setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  //Function to hanle the stream upload to clooudinary

  const streamUpload = (fileBuffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      //use streamfier to convert the fileBuffer to a stream
      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  };

  //call the streamupload function
  const result = await streamUpload(req.file.buffer);

  //respond with the uploaded image url
  res.json({ imageUrl: result.secure_url });

  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;

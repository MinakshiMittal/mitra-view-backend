const express = require("express");
const router = express.Router();
const { Video } = require("../models/video.model");

router.route("/")
.get(async (req, res) => {
  try {
    const videos =await Video.find({});
    res.json({success: true, videos});  
  } catch (error) {
    res.status(500).json({success: false, message: "Unable to get videos", errorMessage: error.message});
  }
})
.post( async (req, res) => {
  try {
    const video = req.body;
    const NewVideo = new Video(video);
    await NewVideo.save();

    res.json({success: true, video});
  } catch (error) {
    res.status(500).json({success: false, message: "Unable to add video", errorMessage: error.message});
  }
});

module.exports = router;
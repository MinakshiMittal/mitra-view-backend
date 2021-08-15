const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Video Name is required!"]
  },
  views: {
    type: Number,
    required: true,
    default: 0
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  dislikes: {
    type: Number,
    required: true,
    default: 0
  },
  description: String,
  videoURL: {
    type: String,
    required: [true, "Video url is required."]
  }
});

const Video = mongoose.model("Video", VideoSchema);

module.exports = { Video };
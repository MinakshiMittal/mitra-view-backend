const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name cannot be empty."]
  },
  lastName: {
    type: String,
    required: [true, "Last Name cannot be empty."]
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Email can't be empty."],
    match: /\S+@\S+\.\S+/
  },
  password: {
    type: String,
    required: [true, "Password cannot be empty"]
  },
  history:[{
    video: {type: mongoose.Schema.Types.ObjectId,
    ref: "Video"
  }}],
  likedVideos: [{
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
  }
  }],
  dislikedVideos: [{
    video: {type: mongoose.Schema.Types.ObjectId,
    ref: "Video"
  }}],
  watchLater: [{
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    }
  }],
  playlists: [{
    name:{
      type:String,
      required: true
    },
    videos:[{
      video: {type: mongoose.Schema.Types.ObjectId,
    ref: "Video"}
    }]
  }]
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
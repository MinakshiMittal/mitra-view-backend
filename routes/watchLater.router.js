const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const _ = require("lodash")

router.use(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, errorMessage: "Unauthorized access" });
  }
});

router.route("/")
.get(async(req, res)=>{
  const {user} = req;
  const {userId} = user;
  const foundUser = await User.findById(userId)
  const watchLater = await foundUser.populate("watchLater.video").execPopulate();

console.log(watchLater);
  res.json({success: true, watchLater: watchLater.watchLater})
})
.post(async(req, res) => {
  const {userId} = req.user;
  const video = req.body;

  console.log(video.video);

  const interactingUser = await User.findById(userId);

  const videoPresent = _.some(interactingUser.watchLater, (watchLaterVideo) => watchLaterVideo.video.toString() === video.video);
  
  console.log(videoPresent)
  if(videoPresent) {
    return res.status(409).json({success: false, message: "Video is already present"});
  }
  
  interactingUser.watchLater.addToSet(video);
  await interactingUser.save();

  res.json({success:true});
})

router.param("videoId", async (req,res,next,videoId)=>{
  try{

    const {userId} = req.user;
    const videoId = req.params;
    const userFound = await User.findById(userId);

    video = userFound.watchLater;
    console.log(video);
  
    if(!userFound) {
      return res.status(400).json({success:false,message:"error finding product"});
    }
    req.video=video;
    next();
  } catch{
    res.status(500).json({success:false,messgae:"error while retrieving the product"})
  }
});

router.route("/:videoId")
.delete(async(req, res) => {
  console.log(req.body);
})

module.exports = router;
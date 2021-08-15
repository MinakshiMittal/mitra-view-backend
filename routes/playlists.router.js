const express = require("express");
const router = express.Router();
const {User} = require("../models/user.model");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

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
  const foundUser = await Playlist.findById(userId)
  const likedVideos = await foundUser.populate("likedVideos.video").execPopulate();

console.log(likedVideos);
  res.json({success: true, likedVideos: likedVideos.likedVideos})
})

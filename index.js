const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const videos = require("./routes/videos.router");
const user = require("./routes/users.router");
const likedVideos = require("./routes/likedVideos.router");
const dislikedVideos = require("./routes/dislikedVideos.router");
const history = require("./routes/history.router");
const watchLater = require("./routes/watchLater.router");
const { mongoDBConnection } = require("./db/db.connect");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoDBConnection();

app.use("/videos", videos);
app.use("/user", user);
app.use("/liked-videos", likedVideos);
app.use("/disliked-videos", dislikedVideos);
app.use("/history", history);
app.use("/watch-later", watchLater);

app.get('/', (req, res) => {
  res.send('Welcome to MITRA-PLAY..!!!');
});

app.use((req, res) => {
  res.status(400).json({
    success: false,
    messageg: "Route not found on server, please check."
  });
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    success: false,
    message: "error occurred, see the errorMessage key for more details",
    errorMessage: error.message
  });
});

app.listen(3000, () => {
  console.log('server started');
});
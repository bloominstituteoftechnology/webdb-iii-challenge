const express = require("express");

const db = require("./data/db");

// Routers
const userRouter = require("./routers/users");
const postRouter = require("./routers/posts");
const tagRouter = require("./routers/tags");

const server = express();

// use middleware
server.use(express.json());

// endpoints here
server.get("/", (req, res) => {
  res.send("up and running");
});

// users
server.use("/users", userRouter);

// posts
server.use("/posts", postRouter);

// tags
server.use("/tags", tagRouter);

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== WEB API LISTENING ON HTTP://LOCALHOST:${port} ===\n`);
});

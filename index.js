const express = require("express");

// Routes
const UserRoutes = require("./Routes/UserRoutes.js");
const PostRoutes = require("./Routes/PostRoutes.js");
const TagRoutes = require("./Routes/TagRoutes.js");

// Middleware
const server = express();
server.use(express.json());

// Routing Middleware
server.use("/users", UserRoutes);
server.use("/posts", PostRoutes);
server.use("/tags", TagRoutes);

server.get("/", (req, res) => {
  res.send("Up and Running");
});

server.listen(3000, () => {
  console.log(`\n=== Web API Listening on http://localhost:3000 === \n`);
});

const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

server.use(bodyParser.json());

server.get("/", (req, res) => {
	res.status(200).send({ api: "running..." });
});

server.use("/users", userRouter);
server.use("/posts", postRouter);

const port = 3333;
server.listen(port, function() {
	console.log(`Server listening on ${port}`);
});

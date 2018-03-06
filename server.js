const express = require("express");
const bodyParser = require("body-parser");

const server = express();

server.use(bodyParser.json());

const port = 3333;
server.listen(port, function() {
	console.log(`Server listening on ${port}`);
});

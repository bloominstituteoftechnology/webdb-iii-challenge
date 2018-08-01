const express = require('express');
const server = express();

const db = require("./data/db")

server.use(express.json());

const port = 8000;


server.get("/api", (req, res) => {
  res.json({ message: "Hello World" });
});



server.listen(port, () => { console.log(`Server is running on port ${port}`)});

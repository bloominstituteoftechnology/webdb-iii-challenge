const express = require("express");

const server = express();

server.use(express.json());

// server.get("/api/cohorts", async (req, res) => {
//   try {
//     const data = await db.find();
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ err, message: "Internal Server Error!" });
//   }
// });

module.exports = server;

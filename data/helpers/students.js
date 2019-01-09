const express = require("express");
const db = require("./studentsModel.js");

const router = express.Router();

router.post("/", (req, res) => {
  const students = req.body;

  // save data to the database
});

module.exports = router;

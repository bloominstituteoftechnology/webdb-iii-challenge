const express = require("express");
const route = express.Router();
const db = require("../data/dbConfig");

route.get("/", async (req, res) => {
  const students = await db("students");

  try {
    res.json(students);
  } catch (err) {
    res.json({ error: "Could not retrieve students data." });
  }
});

module.exports = route;

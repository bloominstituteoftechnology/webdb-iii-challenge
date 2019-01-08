const express = require("express");
const SERVER = express();
const PORT = process.env.PORT || 3300;

SERVER.use(express.json());

// POST COHORTS
SERVER.post("/api/cohorts", (req, res) => {
  const cohort = req.body;
});

// GET COHORTS
SERVER.get("/api/cohorts", (req, res) => {});

// GET COHORT BY ID
SERVER.get("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
});

// GET STUDENTS IN COHORT OF ID
SERVER.get("/api/cohorts/:id/students", (req, res) => {
  const { id } = req.params;
});

// UPDATE A COHORT BY ID
SERVER.put("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
});

// DELETE A COHORT BY ID
SERVER.delete("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
});

SERVER.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});

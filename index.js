// Manage Roles (id, name)
const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  useNullAsDefault: true // needed for sqlite
};
const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Server Works.");
});

server.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await db("cohorts");
    res.status(200).json(cohorts);
  } catch (err) {
    res.status(500).json({
      error: "Could not get cohorts."
    });
  }
});

server.post("/api/cohorts", async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(500).json({
        message: "Please provide a name."
      });
    } else {
      const [id] = await db("cohorts").insert(req.body);
      const cohort = await db("cohorts")
        .where({ id })
        .first();
      res.status(201).json(cohort);
    }
  } catch (err) {
    res.status(500).json({
      error: "Could not create new cohort."
    });
  }
});

server.get("/api/cohorts/:id", async (req, res) => {
  try {
    const role = await db("cohorts")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.put("/api/cohorts/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const cohort = await db("cohorts")
        .where({ id: req.params.id })
        .first();

      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: "Cohort not found" });
    }
  } catch (error) {}
});

server.delete("/api/cohorts/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).json({
        message: "Cohort deleted."
      });
    } else {
      res.status(404).json({
        message: "Cohort not found"
      });
    }
  } catch (err) {}
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\nrunning on http://localhost:${port}\n`)
);

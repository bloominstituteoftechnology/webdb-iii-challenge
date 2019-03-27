const express = require("express");
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  useNullAsDefault: true // needed for sqlite
};

const db = knex(knexConfig);

const router = express.Router();

router.get("/", (req, res) => {});

router.get("/", (req, res) => {});

router.post("/", (req, res) => {});

router.delete("/", (req, res) => {});

router.put("/", (req, res) => {});

module.exports = router;

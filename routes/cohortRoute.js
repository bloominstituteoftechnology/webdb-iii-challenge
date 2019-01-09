const express = require("express");
const knex = require("knex");

const router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const db = require("knex")(configuration);

router.get("/", (req, res) => {
  db("cohorts")
    .select()
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;

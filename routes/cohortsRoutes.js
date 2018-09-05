const express = require("express");
const router = express.Router();
const db = require("../dbConfig");

router.get("/", (req, res) => {
	db("cohorts")
		.then(cohorts => {
			res.status(201).json(cohorts);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

module.exports = router;

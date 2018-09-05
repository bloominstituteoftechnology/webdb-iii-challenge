const express = require("express");
const router = express.Router();
const db = require("../dbConfig");

router.post("/", (req, res) => {
	const cohort = req.body;
	if (!cohort.name) {
		return res.status(400).json({ message: "Pleas provide a cohort name" });
	}
	db.insert(cohort)
		.into("cohorts")
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.get("/", (req, res) => {
	db("cohorts")
		.then(cohorts => {
			res.status(201).json(cohorts);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.get("/:id", (req, res) => {
	db("cohorts")
		.where({ id: req.params.id })
		.then(cohort => {
			res.status(201).json(cohort);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.get("/:id/students", (req, res) => {
	db("students")
		.where({ cohort_id: req.params.id })
		.then(students => {
			res.status(201).json(students);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.put("/:id", (req, res) => {
	const cohort = req.body;
	if (!cohort.name) {
		return res
			.status(400)
			.json({ message: "Please include the desired name change" });
	}
	db("cohorts")
		.where({ id: req.params.id })
		.update({ name: cohort.name })
		.then(ver => {
			res.status(201).json(ver);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.delete("/:id", (req, res) => {
	db("cohorts")
		.where({ id: req.params.id })
		.delete()
		.then(ver => {
			res.status(201).json(ver);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

module.exports = router;

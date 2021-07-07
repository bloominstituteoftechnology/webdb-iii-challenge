const express = require("express");
const router = express.Router();
db = require("../dbConfig");

router.post("/", (req, res) => {
	const student = req.body;
	if (!student.name || !student.cohort_id) {
		return res
			.status(400)
			.json({ message: "Please provide student name and/or cohort id" });
	}
	db.insert(student)
		.into("students")
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.get("/", (req, res) => {
	db("students")
		.then(students => {
			res.status(201).json(students);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.get("/:id", (req, res) => {
	db("cohorts")
		.where({ "cohorts.id": req.params.id })
		.innerJoin("students", "cohorts.id", "students.cohort_id")
		.then(japeeper => {
			res.status(201).json(japeeper);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.put("/:id", (req, res) => {
	const student = req.body;
	if (!student.name || !student.cohort_id) {
		return res.status(400).json({
			message: "Please include the desired name and/or cohort id",
		});
	}

	db("students")
		.where({ id: req.params.id })
		.update({ name: student.name, cohort_id: student.cohort_id })
		.then(ver => {
			res.status(201).json(ver);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.delete("/:id", (req, res) => {
	db("students")
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

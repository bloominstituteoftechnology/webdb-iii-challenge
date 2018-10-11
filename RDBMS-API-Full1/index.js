const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.post("/api/cohorts", (req, res) => {
	const cohort = req.body;
	if (cohort === "") {
		res.status(500).json({ error: "Please enter text field" });
	} else {
		db.insert(cohort)
			.into("cohorts")
			.then(id => {
				res.status(200).json(id);
			})
			.catch(err => {
				res.status(500).json({ error: "Problem posting cohort" });
			});
	}
});

server.get("/api/cohorts", (req, res) => {
	db("cohorts")
		.then(cohort => {
			res.status(200).json(cohort);
		})
		.catch(err => {
			res.status(500).json({ error: "Error grabbing cohort data" });
		});
});

server.get("/api/cohorts/:id", (req, res) => {
	const { id } = req.params;
	db("cohorts")
		.where({ id })
		.then(cohort => {
			res.status(200).json(cohort);
		})
		.catch(err => {
			res.status(500).json({ error: "Error grabbing cohort data" });
		});
});

server.get("/api/cohorts/:id/students", (req, res) => {
	const cohort_id = req.params.id;
	db("students")
		.where({ cohort_id })
		.then(student => {
			res.status(200).json(student);
		})
		.catch(err => {
			res.status(500).json({ error: "Error grabbing cohort data" });
		});
});

server.put("/api/cohorts/:id", (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	db("cohorts")
		.where({ id })
		.update(changes)
		.then(count => {
			if (!count || count < 1) {
				res.status(401).json({ message: "no records found to update" });
			} else {
				res.status(200).json(count);
			}
		});
});

server.delete("/api/cohorts/:id", (req, res) => {
	const { id } = req.params;
	db("cohorts")
		.where({ id })
		.del()
		.then(count => {
			res.status(200).json(count);
		})
		.catch(err => {
			res.status(500).json({ error: "There is no record to delete." });
		});
});

server.listen(9000, () => console.log("\nAPI running on 9k\n"));

const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile.js");

const port = 3333;
const db = knex(knexConfig.development);
const app = express();

app.use(helmet());
app.use(express.json());

app.get("/api/cohorts", (req, res) => {
	db("cohorts")
		.then(cohort => {
			res.status(200).json(cohort);
		})
		.catch(e => {
			res.status(500).json({ e: "Error grabbing cohort data" });
		});
});

app.post("/api/cohorts", (req, res) => {
	const cohort = req.body;
	if (!cohort) {
		res.status(500).json({ error: "Please enter a cohort!" });
	} else {
		db
			.insert(cohort)
			.into("cohorts")
			.then(id => {
				res.status(200).json(id);
			})
			.catch(e => {
				res.status(500).json({ e: "There was a problem adding to the cohort" });
			});
	}
});

app.get("/api/cohorts/:id", (req, res) => {
	const id = req.params.id;
	db("cohorts")
		.where({ id })
		.then(cohort => {
			res.status(200).json(cohort);
		})
		.catch(e => {
			res.status(500).json({ e: "Error grabbing cohort data" });
		});
});

app.get("/api/cohorts/:id/students", (req, res) => {
	const cohort_id = req.params.id;
	db("students")
		.where({ cohort_id })
		.then(student => {
			res.status(200).json(student);
		})
		.catch(e => {
			res.status(500).json({ e: "Error grabbing cohort data" });
		});
});

app.put("/api/cohorts/:id", (req, res) => {
	const id = req.params.id;
	const changes = req.body;
	db("cohorts")
		.where({ id })
		.update(changes)
		.then(count => {
			if (!count) {
				res.status(401).json({ message: "no records found to update" });
			} else {
				res.status(200).json(count);
			}
		});
});

app.delete("/api/cohorts/:id", (req, res) => {
	const id = req.params.id;
	db("cohorts")
		.where({ id })
		.del()
		.then(count => {
			res.status(200).json(count);
		})
		.catch(e => {
			res.status(500).json({ e: "There is no record to delete." });
		});
});

app.listen(port, () => console.log(`==API running on Port ${port}==`));

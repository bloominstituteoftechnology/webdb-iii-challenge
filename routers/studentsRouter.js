const express = require("express");
const router = express.Router();
const knex = require("knex");

const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

// [POST] /students`
// This route should save a new student to the database.
router.post("/", (req, res) => {
  db("students")
    .insert(req.body)
    .then(id => res.status(200).json(id))
    .catch(err => res.status(500).json(err));
});

// [GET] /students
// This route will return an array of all students.
router.get("/", (req, res) => [
  db("students")
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json(err))
]);

// [GET] /students/:id
// This route will return the student with the matching `id`.

/*
Have the student returned by the `[GET] /students/:id` endpoint include the cohort name and remove the `cohort_id` fields. The returned object should look like this:

```js
{
   id: 1,
   name: 'Lambda Student',
   cohort: 'Full Stack Web Infinity'
}
```
*/
router.get("/:id", (req, res) => {
  const {id} = req.params;
  db("students as s")
    .join("cohorts as c", "s.cohort_id", "c.id")
    .select("s.id", "s.name", "c.name as cohort")
    .where("s.id", id)
    .then(student => res.status(200).json(student))
    .catch(err => res.status(500).json(err));
});

// [PUT] /students/:id
// This route will update the student with the matching `id` using information sent in the body of the request.
router.put("/:id", (req, res) => {
  const {id} = req.params;
  db("students")
    .where({id})
    .update(req.body)
    .then(count => res.status(201).json({success: `${count} student updated`}))
    .catch(err => res.status(500).json(err));
});
// [DELETE] /students/:id
//This route should delete the specified student.
router.delete("/:id", (req, res) => {
  const {id} = req.params;
  db("students")
    .where({id})
    .del()
    .then(count => res.status(200).json({success: `${count} student deleted`}))
    .catch(err => res.status(500).json(err));
});

module.exports = router;

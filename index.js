const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const port = 9000;
const server = express();

server.use(express.json());

// R O O T
server.get("/", (req, res) => {
  res.send("yup");
});

// C O H O R T   R O U T I N G  //
// G E T   C O H O R T S
server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json(err));
});

// G E T   B Y   I D
server.get("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;

  db("cohorts")
    .where({ id: id })
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(err => res.status(500).json(err));
});

// G E T   S T U D E N T S   B Y   C O H O R T   I D
server.get("/api/cohorts/:id/students", (req, res) => {
  const { id } = req.params;

  db("students")
    .where({ cohort_id: id })

    .then(students => res.status(200).json(students));
});

// P O S T   C O H O R T
server.post("/api/cohorts", (req, res) => {
  const cohort = req.body;

  db("cohorts")
    .insert(cohort)
    .returning("id")
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// U P D A T E   C O H O R T
server.put("/api/cohorts/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("cohorts")
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

// D E L E T E   C O H O R T
server.delete("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;

  db("cohorts")
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

// S T U D E N T   R O U T I N G  //
// G E T   S T U D E N T S
server.get("/api/students", (req, res) => {
  db("students")
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json(err));
});

// G E T  S T U D E N T S  B Y  I D
server.get("/api/students/:id", (req, res) => {
  const { id } = req.params;

  db("students")
    .where({ id: id })
    .then(student => {
      res.status(200).json({
        id: student[0].id,
        name: student[0].name,
        cohort_id: student[0].cohort_id
      });
    })
    .catch(err => res.status(500).json(err));
});

// P O S T   S T U D E N T
server.post("/api/students", (req, res) => {
  const student = req.body;

  db("students")
    .insert(student)
    .returning("id")
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// E D I T   S T U D E N T
server.put("/api/students/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("students")
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

// D E L E T E  S T U D E N T
server.delete("/api/students/:id", (req, res) => {
  const { id } = req.params;

  db("students")
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

server.listen(9000, () => console.log(`API running on port ${port}`));

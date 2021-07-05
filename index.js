const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

//===========cohorts data table================//
const dataConfig = require("./knexfile");
const dataBase = knex(dataConfig.development);
//===========cohorts data table================//

const server = express();

server.use(express.json());
server.use(helmet());

//======================MVP ENDPOINTS==============================//
server.get("/api/cohorts", (req, res) => {
  dataBase("cohorts")
    .then(names => {
      res.status(200).json(names);
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "Names cannot be retrieved" });
    });
});

server.get("/api/cohorts/:id", (req, res) => {
  const id = req.params.id;
  dataBase("cohorts")
    .select("name")
    .where({ id: id })
    .then(names => {
      res.status(200).json(names);
    })
    .catch(err => {
      console.log("Error: ", err);
      res
        .status(500)
        .json({ Error: "Names with specified id's cannot be retrieved" });
    });
});

server.get("/api/cohorts/:id/students", (req, res) => {
  const { id } = req.params;
  dataBase("students")
    .where({ cohort_id: id })
    .then(id => {
      res.status(200).json(id);
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json(err);
    });
});

server.post("/api/cohorts", (req, res) => {
  const cohorts = req.body;

  dataBase
    .insert(cohorts)
    .into("cohorts")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "Pass a name." });
    });
});

server.put("/api/cohorts/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  dataBase("cohorts")
    .where({ id }) // .where('id', '=', id)
    .update(changes)
    .then(count => {
      if (count === 0) {
        res.status(404).json({ Error: "Cohorts needs name" });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;

  dataBase("cohorts")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
//======================MVP ENDPOINTS==============================//

//=========================STRETCH======================================//
server.get("/students", (req, res) => {
  dataBase("students")
    .then(student => {
      res.status(200).json(student);
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "Students couldn't be retrieved" });
    });
});

server.get("/students/:id", (req, res) => {
  const id = req.params.id;
  dataBase("students")
    .select("name")
    .where({ id: id })
    .then(names => {
      res.status(200).json(names);
    })
    .catch(err => {
      console.log("Error: ", err);
      res
        .status(500)
        .json({ Error: "Names with specified id's cannot be retrieved" });
    });
});

server.post("/students", (req, res) => {
  const students = req.body;
  dataBase
    .insert(students)
    .into("students")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "Pass in a student's name" });
    });
});

server.put("/students/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  dataBase("students")
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "Couldn't update" });
    });
});

server.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  dataBase("students")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ Error: "Couldn't delete" });
    });
});
//=========================STRETCH======================================//

server.listen(2200, () =>
  console.log(`\n=== Web API Running On Port:2200 ===\n`)
);

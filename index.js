const express = require('express');
const helmet = require('helmet');
const dbhelpers = require("./dbhelpers/helpers");


const server = express();

server.use(express.json());
server.use(helmet());

server.get("/api/:whichtable", async (req, res) => {
  let table = "cohorts";
  // if(req.params.whichtable ==="b"){
  //   table = "bears";
  // }
  try {
    const results = await dbhelpers.get(null,table);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});
server.get("/api/:whichtable/:cohortID", async (req, res) => {
  let table = "cohorts";
  // if(req.params.whichtable ==="b"){
  //   table = "bears";
  // }
  if (!Number(req.params.cohortID)) {
    res.status(400).json({ errorMessage: "ID not a number" });
    return;
  }
  try {
    const results = await dbhelpers.get(req.params.cohortID,table);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});
server.get("/api/cohorts/:cohortID/students", async (req, res) => {
  
  if (!Number(req.params.cohortID)) {
    res.status(400).json({ errorMessage: "ID not a number" });
    return;
  }
  try {
    const results = await dbhelpers.studentsIn(req.params.cohortID);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});


server.use("/", (req, res) =>
  res
    .status(404)
    .json({ errorMessage: "You probably want to use a different endpoint" })
);


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
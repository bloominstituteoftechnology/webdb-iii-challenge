const expres = require("express");
const helmet = require("helmet");
const dbhelpers = require("./dbhelpers/helpers");

const server = express();

server.use(express.json());
server.use(helmet());

server.get("/api/:whichtable", async (req, res) => {
  let table = "cohorts";
  if (req.params.whichtable === "students") {
    table = "students";
  }
  try {
    const results = await dbhelpers.get(null, table);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});
server.get("/api/:whichtable/:cohortID", async (req, res) => {
  let table = "cohorts";
  if (req.params.whichtable === "students") {
    table = "students";
  }
  if (!Number(req.params.cohortID)) {
    res.status(400).json({ errorMessage: "ID not a number" });
    return;
  }
  try {
    const results = await dbhelpers.get(req.params.cohortID, table);
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

server.delete("/api/:whichtable/:cohortID", async (req, res) => {
  let table = "cohorts";
  if (req.params.whichtable === "students") {
    table = "students";
  }
  if (!Number(req.params.cohortID)) {
    res.status(400).json({ errorMessage: "ID not a number" });
  }

  try {
    const results = await dbhelpers.delete(req.params.cohortID, table);
    if (results) {
      res.status(200).json({ message: "Success" });
    } else {
      res.status(500).json({ errorMessage: "Invalid ID for removal" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

server.post("/api/:whichtable", async (req, res) => {
  let table = "cohorts";
  if (req.params.whichtable === "students") {
    table = "students";
  }
  if (!req.body.name) {
    res.status(400).json({ errorMessage: "Invalid body" });
  }
  try {
    const results = await dbhelpers.insert(req.body, table);
    res.status(200).json({ results });
  } catch (err) {
    res.status(500).json(err);
  }
});

server.put("/api/:whichtable/:cohortID", async (req, res) => {
  let table = "cohorts";
  if (req.params.whichtable === "students") {
    table = "students";
  }
  if (!req.body.name) {
    res.status(400).json({ errorMessage: "Invalid body" });
    return;
  }
  if (!Number(req.params.cohortID)) {
    res.status(400).json({ errorMessage: "ID not a number" });
    return;
  }
  try {
    const results = await dbhelpers.edit(req.params.cohortID, req.body, table);
    res.status(200).json({ results });
  } catch (err) {
    res.status(500).json(err);
  }
});

server.use("/", (req, res) =>
  res.status(404).json({ errorMessage: "Use a different endpoint" })
);

const port = 3300;
server.listen(port, () => {
  console.log(`\nListening on port:${port} \n`);
});

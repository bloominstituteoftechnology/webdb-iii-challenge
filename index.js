const PORT = 3300 || process.env.PORT;
server = require("./server");
const db = require("./database/knexCohorts");

server.get("/api/cohorts", async (req, res) => {
  try {
    const data = await db.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

server.get("/api/cohorts/:id", async (req, res) => {
  try {
    const data = await db.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

server.delete("/api/cohorts/:id", async (req, res) => {
  try {
    const data = await db.remove(req.params.id);
    res.status(204).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

server.post("/api/cohorts", async (req, res) => {
  try {
    const data = await db.add(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

server.put("/api/cohorts/:id", async (req, res) => {
  try {
    const data = await db.update(req, params.id, req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

server.listen(PORT, () => {
  console.log(`The Server is listening on Port:${PORT}`);
});

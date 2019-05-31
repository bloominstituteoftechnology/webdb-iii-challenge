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

server.listen(PORT, () => {
  console.log(`The Server is listening on Port:${PORT}`);
});

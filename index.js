const express = require("express");
const server = express();
const port = 7000;

const cohortsRouter = require("./routers/cohortsRouter");
const studentsRouter = require("./routers/studentsRouter");

server.use(express.json());
server.use("/api/cohorts", cohortsRouter);
server.use("/api/students", studentsRouter);

server.listen(port, () => console.log("\n== PORT IS LIVE ON 7000 ==\n"));

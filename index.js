const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const cohortsRoutes = require("./routes/cohortsRoutes");
// const studentsRoutes = require("./routes/studentsRoutes");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

server.use("/api/cohorts", cohortsRoutes);
// server.use("/api/students", studentsRoutes);

const port = 8000;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port}===\n`);
});

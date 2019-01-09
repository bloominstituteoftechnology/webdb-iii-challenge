const express = require("express");
const helmet = require('helmet');

const server = express();
const cohortRouter = require('./data/helpers/cohort');
const studentRouter = require('./data/helpers/students');


server.use(express.json());
server.use(helmet())
server.use("/api/cohorts", cohortRouter);
server.use("/api/students", studentRouter);


//endpoints here

server.get('/', (req, res) => {
    res.send("The Server is Alive!")
})

const port = 4300;
server.listen(port, function () {
    console.log(`\n=== WebAPI Listening on: ${port} ===\n`)
})
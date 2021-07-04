const express = require('express');
const cohortsRouter = require('./cohorts/cohortsRouter');
const studentsRouter = require('./students/studentsRouter');

const app = express();

app.use(express.json());


app.use("/api/cohorts", cohortsRouter);
app.use("/api/students", studentsRouter);

module.exports = app;   
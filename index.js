const express = require('express'),
    bodyParser = require('body-parser'),
    students = require('./api/students'),
    cohorts = require('./api/cohorts');

const app = express();

app
    .use(bodyParser.json())
    .use('/students', students)
    .use('/cohorts', cohorts);


app.listen(5000);
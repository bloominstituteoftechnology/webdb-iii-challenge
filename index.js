const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const knex = require('knex');

const dbConfig = require('./knexfile');

const cohortsRoute = require('./routes/cohorts');
// const studentsRoute = require('./routes/students');

const app = express();
const db = knex(dbConfig.development);
const PORT = 8080;

app.use(express.json());
app.use(helmet());
app.use(logger('dev'));

// routes
app.use('/api/cohorts', cohortsRoute);
// app.use('/api/students', studentsRoute);

app.get('/', (req, res) => {
  res.json({ message: 'app is running' });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

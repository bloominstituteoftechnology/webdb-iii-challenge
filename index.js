const knex = require('knex');
const cors = require('cors');
const express = require('express');
const server = express();

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);
server.use(express.json(), cors());

const PORT = 6060;

server.post('/api/cohorts', (req, res) => {
  const { name } = req.body;
  !name
    ? res.status(400).json({ error: 'Property "name" is required!' })
    : db('cohorts')
        .insert({ name })
        .then(ids => res.status(201).json(ids[0]))
        .catch(err => {
          res
            .status(500)
            .json({ error: 'Something went wrong adding your new cohort!' });
          console.error(err);
        });
});

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(results =>
      !results.length
        ? res.json({
            error: 'There is no cohort added yet, please try again later.'
          })
        : res.json(results)
    )
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Something went wrong retrieving your cohorts!' });
      console.error(err);
    });
});

server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts')
    .where('id', id)
    .then(result =>
      result.length
        ? res.json(result)
        : res.status(404).json({
            error: `We couldn't find any cohort with ID: ${id}. Please check the information submitted.`
          })
    )
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Something went wrong retrieving your cohort.' }),
        console.error(err);
    });
});

server.get('/api/cohorts/:id/students', (req, res) => {
  const { id } = req.params;
  db('students')
    .where('cohort_id', id)
    .then(result =>
      result.length
        ? res.json(result)
        : res.status(404).json({
            error: `We couldn't find any student in the cohort with the submitted ID.`
          })
    )
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Something went wrong retrieving your student.' }),
        console.error(err);
    });
});

server.put('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  !name
    ? res.status(400).json({ error: 'Property "name" is required!' })
    : db('cohorts')
        .where('id', id)
        .update({ name })
        .then(count =>
          count
            ? res.json(count)
            : res.status(404).json({
                error: `We couldn't find any cohort with ID: ${id}. Please check the information submitted.`
              })
        )
        .catch(err => {
          res
            .status(500)
            .json({ error: 'Something went wrong updating your cohort.' });
          console.error(err);
        });
});

server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts')
    .where('id', id)
    .del()
    .then(count =>
      count
        ? res.status(201).json(count)
        : res.status(404).json({
            error: `We couldn't find any cohort with ID: ${id}. Please check the information submitted.`
          })
    )
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Something went wrong deleting your cohort.' });
      console.error(err);
    });
});

server.listen(PORT, () =>
  console.log(`\n=== Server Listening on http://localhost:${PORT} ===\n`)
);

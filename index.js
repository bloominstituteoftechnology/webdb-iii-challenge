const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/api/cohorts', async (req, res) => {
  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json({ message: " error: 'The cohorts could not be retrieved'", error: error });
  }
});

server.get('/api/cohorts/:cohortId', async (req, res) => {
  const { cohortId } = req.params;
  console.log('the cohortID is: ', cohortId);

  try {
    const cohort = await db('cohorts').where({ id: cohortId });
    {
      cohort[0]
        ? res.status(200).json({ cohort })
        : res.status(404).json({ error: 'The cohort with that ID does not exist.' });
    }
  } catch (error) {
    console.log('The error is: ', error);
    res.status(500).json(error);
  }
});

// server.post('/api/zoos', async (req, res) => {
//   const zooData = req.body;
//   if (!zooData.name) {
//     res.status(400).json({ errorMessage: 'Please provide a name for your zoo' });
//   } else {
//     try {
//       const newZooId = await db('zoos').insert(zooData);
//       res.status(201).json(newZooId);
//     } catch (error) {
//       res.status(500).json({ message: 'Error inserting', error });
//     }
//   }
// });

// server.delete('/api/zoos/:zooId', async (req, res) => {
//   const { zooId } = req.params;

//   try {
//     const deletedZooCount = await db('zoos')
//       .where({ id: zooId })
//       .del();
//     {
//       deletedZooCount === 0
//         ? res.status(404).json({ message: 'The zoo with the specified ID does not exist.' })
//         : res.status(200).json({ deletedZooCount });
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// server.put('/api/zoos/:zooId', async (req, res) => {
//   const changes = req.body;
//   const { zooId } = req.params;

//   if (!changes.name) {
//     res.status(400).json({ errorMessage: 'Please provide a name for the zoo.' });
//   }

//   try {
//     const updatedZooCount = await db('zoos')
//       .where({ id: zooId })
//       .update(changes);
//     {
//       updatedZooCount === 0
//         ? res.status(404).json({ message: 'The zoo with the specified ID does not exist.' })
//         : res.status(200).json({ updatedZooCount });
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// server.get('/', (req, res) => {
//   res.json({ api: 'up' });
// });

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

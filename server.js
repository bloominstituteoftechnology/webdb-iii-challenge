const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const api = require('./routes/apiRouter.js')

const db = require('./data/db');

const server = express();

server.use(express.json());
server.use(helmet())
server.use(morgan('tiny'))


server.use('/api', api)

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});






// endpoints here

// server.get('/', (req, res) => {
//   res.send('Up and running')
// })

// server.get('/zoos', (req, res) => {
//   db('zoos').then(zoos => {
//     res.status(200).json(zoos)
//   })
//   .catch(err => res.status(500).json(err))
// })

// server.post('/zoos', (req,res) => {
//   const zoo = req.body;

//   db.insert(zoo).into('zoos').then(ids => {
//     const id = ids[0];
//     res.status(201).json({ id, ...zoo})
//   }).catch(err => res.status(500).json(err))
// })





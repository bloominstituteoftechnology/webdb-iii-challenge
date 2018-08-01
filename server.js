const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const api = require('./routes/apiRouter.js')

const server = express();

server.use(express.json());
server.use(helmet())
server.use(morgan('tiny'))

server.get('/', (req, res) => {
  res.send(`Server running on port ${port}`)
})

server.use('/api', api)

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});



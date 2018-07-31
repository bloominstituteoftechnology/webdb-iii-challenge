const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const apiRoutes = require('./api/apiRoutes');

const server = express();
const port = 8000;

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/', apiRoutes);

server.get('/', (req, res) => {
  res.send('The blog server is running...')
});

server.listen(port, () => console.log(`\n==== API running on port ${port} ====\n`));
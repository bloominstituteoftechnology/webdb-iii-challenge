const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

// const cohortRoutes = require('./routes/cohortRoutes');
// const studentRoutes = require('./routes/studentRoutes');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

// server.use('/api/users', userRoutes);
// server.use('/api/posts', postRoutes);
// server.use('/api/tags', tagRoutes);

server.get('/', (req, res) => {
  res.send('It works mon');
});

const port = 3800;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} mon ===\n`);
});

const express = require('express');
const helmet = require('helmet');

const cohortRouter = require('./routes/cohorts.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/cohorts', cohortRouter);

const port = process.env.PORT || 5000;

server.listen(port, () =>
	console.log(`\n*** Server running at http://localhost:${port} ***\n`),
);

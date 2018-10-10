const express = require('express');

const helmet = require('helmet');

const logger = require('morgan');

const cohortsRoutes = require('./cohorts/cohortsRoutes');

const server = express();



///////////+++++++++++MIDDLEWARE

server.use(
    express.json(),
    logger(":method :url :status :response-time ms"),
    helmet()
    );

////////////+++++++++cohort Routes

server.get('/', (req, res) => {
    res.send("Last Chance");
  });

server.use('/api/cohorts', cohortsRoutes);

    const port = 8300;
server.listen(port, function() {
  console.log(`\n=== Web API Has An Ear on http://localhost:${port} ===\n`);
});
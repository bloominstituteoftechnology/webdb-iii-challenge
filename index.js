const express = require('express');
const helmet = require('helmet');
const lambdaRoutes = require('./lambda/cohortsRoutes')

const server = express();

server.use(helmet());
server.use(express.json());

//SANITY CHECK ENDPOINT;
server.get('/', (req, res) => {
    res.send('Tom was here');
})

server.use('/api/cohorts', lambdaRoutes)

server.listen(8000, () => console.log(`\n server is alive on 8000 \n`))
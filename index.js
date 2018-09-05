const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development)
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

// https://github.com/LambdaSchool/RDBMS-API-Full/pull/108

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan());

app.get('/', (req, res)=>{
    res.send('Lets build an API...');
});

app.listen(8000, () => console.log('Running on port 8000'));
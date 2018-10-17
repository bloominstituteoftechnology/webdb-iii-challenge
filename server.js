const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const knex = require('knex');

//Server Instantiation
const appServ = express();













//Port & Port Listener
const port = 6000;
appServ.listen(port, () => console.log(`\n Listening on ${port}`));
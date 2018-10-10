const helmet = require('helmet');
const express = require ('express');
const zooRoutes = require('./routes/zoo_routes.js');
const server = express();

server.use(helmet());
server.use(express.json());

server.get('/',(req,res)=>{
res.send('use /api/cohorts to access data');
})

server.use('/api/cohorts',zooRoutes)

server.listen(9000, () => console.log('\nAPI running on 9k\n'));
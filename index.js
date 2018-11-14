const express = require('express')
const port = process.env.PORT || 3334
const server = express()
const knex = require("knex");
const knexConfig = require("./knexfile");
const routeMaker = require('./config/routeMaker')
const middleware = require('./config/middleware')
const db = knex(knexConfig.development)

middleware(server)

server.get('/', (req,res)=>{
    res.send('<h1>built by Ryan Clausen</h1>')
})

server.use('/api/cohorts', routeMaker(db, 'cohorts'))
server.use('/api/students', routeMaker(db, 'students'))

server.listen(port, ()=> console.log(`we hear you ${port}`))
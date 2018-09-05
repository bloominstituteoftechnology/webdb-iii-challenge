const express = require('express')
const knex = require('knex')
const knexConfig = require('./knexfile')

const server = express()
const db = knex(knexConfig.development)

server.use(express.json())

server.get('/cohorts', async (req, res) => {
  const cohorts = await db.select().table('cohorts')
  res.status(200).json(cohorts)
})

server.listen('3300', () => {
  console.log(`\n=== Web API Listening on http://localhost:3300 ===\n`)
})
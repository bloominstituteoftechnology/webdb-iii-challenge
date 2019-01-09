const express = require('express');
const cors = require('cors');

const server = express()

const cohortRouter = require('./data/routes/cohortRouter');

const PORT = process.env.PORT || 5000;

server.use(
  cors(),
  express.json()
)

server.use('/api/cohorts', cohortRouter)


server.listen(PORT, () => {
  console.log(`express server is running on port ${PORT}`)
})
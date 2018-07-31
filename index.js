// @ importing express library, morgan, helmet
const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')

// @ importing knex already configured to use db
const db = require('./data/db')

// @ initiating server

const app = express()

// @ middleware
app.use(logger('dev'))
app.use(helmet())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('All good!')
})

app.get('/users', (req, res) => {
  db('users').then(users => {
    res.status(200).json(users)
  }).catch(err => res.status(500).json(err))
})

app.post('/users', (req, res) => {
  const user = req.body
  const { name } = user

  // ! NEED MORE ERROR HANDLING
  if (!name) res.status(400).json('msg: user must have a name field')

  db.insert(user).into('users').then(ids => {
    const id = ids[0]
    res.status(201).json({ id, ...user })
  }).catch(err => res.status(500).json(err))
})

// @ Server Listening ...
const port = 3030
app.listen(port, () => {
  console.log(`\n=== Web API Online on http://localhost:${port} ===\n`)
})

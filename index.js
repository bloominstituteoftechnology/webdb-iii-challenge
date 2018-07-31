const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')

const db = require('./data/db')

const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
const tagRouter = require('./tags/tagRouter')

const app = express()

app.use(logger('dev'))
app.use(helmet())
app.use(express.json())

app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/tags', tagRouter)

app.get('/', (req, res) => {
  res.send('All good!')
})

const port = 3030
app.listen(port, () => {
  console.log(`\n=== Web API Online on http://localhost:${port} ===\n`)
})

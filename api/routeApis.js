const routeUsers = require('./Routes/routeUsers')
const routePosts = require('./Routes/routePosts')
const routeTags = require('./Routes/routeTags')
module.exports = (server) => {
  server.use('/api/users', routeUsers)
  server.use('/api/posts', routePosts)
  server.use('/api/tags', routeTags)
  server.use((err, req, res, next) => {
    switch (err.message) {
      case 'CANT_FIND':
        res
          .status(404)
          .json({ error: `There is no existing item with that ID` })
        break
      case 'INVALID_USER':
        res
          .status(400)
          .send({ error: 'Please provide a name, up to 128 characters max' })
        break
      case 'INVALID_POST':
        res
          .status(400)
          .send({ error: 'Please provide text for post & or userID' })
        break
      default:
        res.status(500).send({ error: err.message })
    }
  })
}

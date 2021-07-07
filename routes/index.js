const cohortRouter = require('./cohortsRouter')

module.exports = (server) => {
  server.use('/api/cohorts', cohortRouter)

  server.use((err, req, res, next) => {
    switch (err.message) {
      case 'ID NOT FOUND':
        res.status(404).json({ error: err.message })
        break
      case 'needs update content':
        res.status(404).json({ error: err.message })
        break
      default:
        res.status(500).json({ error: err.message })
        break
    }
  })
}

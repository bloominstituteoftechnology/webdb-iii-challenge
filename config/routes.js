const cohortsRouter = require('../routes/cohorts');

module.exports = server => {
    server.use('/api/cohorts', cohortsRouter)
}
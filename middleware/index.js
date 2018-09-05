exports.assignTable = (req, res, next) => {
    req.url.includes('cohorts') ? req.tableName = `cohorts` : req.tableName = `students`
    next()
}
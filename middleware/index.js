exports.assignTable = (req, res, next) => {
    req.url.includes('cohorts') ? req.tableName = `cohorts` : req.tableName = `students`
    next()
}

exports.errorHandler = (err, req, res, next) => {
    res.status(500)
        .json({
            message: `Something broke`
        })
}
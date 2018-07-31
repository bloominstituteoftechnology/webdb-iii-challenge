// error handling middleware
function errors(err, req, res, next) {
  switch (err.code) {
    case 400:
      res.status(400).json({
        error: err.error,
      });

    case 500:
      res.status(500).json({
        error: err.error,
      });

    default:
      res.status(400).json({
        error: 'Something weird has happened!',
      });
  }
}

module.exports = errors;

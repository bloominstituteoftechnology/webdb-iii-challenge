const cohortDB = require("../db/dbConfig");
let exists = false;
function cohortChecker(req, res, next) {
  if (!req.body.cohort_id) {
    res.status(500).json({ Error: "The chort_id propety is required" });
  } else if (!req.body.name) {
    res.status(500).json({ Error: "The name property is required" });
  } else {
    cohortDB("cohorts")
      .then(cohorts => {
        cohorts.forEach(cohort => {
          if (cohort.id === req.params.id) {
            exists = true;
          }
        });
        if (exists === true) {
          next();
        } else {
          res
            .stats(404)
            .json({
              Error: `${req.body.cohort_id} is not an existing cohort id`
            });
        }
      })
      .catch(error => {
        res.status(500).json({
          Error:
            "There was a problem obtaining the list of cohort ids to compare with the cohort_id on the student you were adding",
          error
        });
      });
    next();
  }
}

module.exports = cohortChecker;

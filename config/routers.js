const cohortRouters = require('../api/cohortRouters');

const cohorts = server => {
  server.use('/api/cohorts', cohortRouters);
};

module.exports = {
  cohortRouters: cohorts,
}

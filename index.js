const server = require('./server.js');
const knex = require('knex');
const cohortsRoutes = require('./cohortsRoutes.js');
const studentsRoutes = require('./studentsRoutes.js');
const knexConfig = require('./knexfile.js');

// connect to the database
const db = knex(knexConfig.development);

// json middleware
server.use(express.json());

// end points middleware
server.use('/api/cohorts', cohortsRoutes);
server.use('/api/students', studentsRoutes);

// root
server.get('/', (req, res) => {
  res.send('api working');
});

const server = require('./server.js');
const cohortsRoutes = require('./Routes/cohortsRoutes.js');
const studentsRoutes = require('./Routes/studentsRoutes.js');

// json middleware
server.use(express.json());

// end points middleware
server.use('/api/cohorts', cohortsRoutes);
server.use('/api/students', studentsRoutes);

// root
server.get('/', (req, res) => {
  res.send('api working');
});

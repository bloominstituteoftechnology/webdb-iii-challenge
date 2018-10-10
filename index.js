const express = require('express');
const helmet = require('helmet');
const CohortsRoutes = require('./API/Cohorts/cohortsroutes');
const StudentsRoutes = require('./API/Students/studentsroutes');

// server init
const server = express();
server.use(express.json());
server.use(helmet());

// routes
server.use('/api/cohorts', CohortsRoutes);
server.use('/api/students', StudentsRoutes);

server.use((req, res) => {
  res.status(404).json({"error": `The requested path '${req.url}' doesn't exist.`});
});

// listener
const port = 8080;
server.listen(port, () => console.log(`\n~~~ Server listening on port ${port} ~~~\n`));

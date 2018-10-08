const express = require('express');
const port = 5555;
const server = express();
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')


server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'))
server.use(cors())

const cohortsRoutes = require('./Routes/cohortsRoutes')
const studentsRoutes = require('./Routes/studentsRoutes')

server.use('/api/cohorts', cohortsRoutes);
server.use('/api/students', studentsRoutes);

server.get('/', (req, res) => {
	res.send('API is working')
})

server.listen(port, () => console.log(`server running on port 5555`));

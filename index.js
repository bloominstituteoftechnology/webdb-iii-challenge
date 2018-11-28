const express = require('express');
const cohorts = require('./routes/api/cohorts');
const students = require('./routes/api/students');

const server = express();

server.use(express.json());
server.use('/api/cohorts', cohorts);
server.use('/api/students', students);

server.get('/', (req, res) => {
    res.send('HI!');
});

server.listen(5000, () => console.log('Server running on port 5000'));
// Angelo Deleon FSW14
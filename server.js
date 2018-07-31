const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./data/db');


const server = express();

server.use(express.json());

server.use(morgan('dev'));

server.get('/', (req, res) => {
        res.send('Testing');
});

server.get('/api/users', (req, res) => {
	db('users')
	.then(response => {
		res.status(200).json(response);
	})

	.catch(err => res.status(500).json(err));

});



server.listen(5000, () => console.log('API running on port 5000'));

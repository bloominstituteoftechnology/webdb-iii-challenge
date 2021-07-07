const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());


server.get('/users', (req, res) => {
    db('users')
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => { res.status(500).json(err)})
})


server.listen(3000, () => console.log('\nServer is running...\n'))
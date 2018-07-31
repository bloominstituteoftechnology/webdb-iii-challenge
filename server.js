const express = require('express');

const server = express();

const db = require('./data/db')

//middleware
server.use(express.json());

function sendError(code, message, error) {
    return {
        code: code,
        message: message,
        error: error
    }
}

server.get('/', (req, res) => {
    res.send('Welcome to my Lambda Forum')
})

server.get('/users', async (req, res, next) => {
    try {
        const response = await(db('Users'));
        res.status(200).json(response);
    } catch(error) {
        next(sendError(500, 'Failed to get users information', error.message))
    }
})

server.post('/users', async (req, res, next) => {
    const newUser = req.body;
    try {
        const response = await (db('Users').insert(newUser));
        const id = response[0];
        res.status(201).json({id, ...newUser});
    } catch(error) {
        console.log(error)
        next(sendError(500, 'Failed to get users information', error.message))
    }
})

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
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
        const response = await(db('Users').select());
        res.status(200).json(response);
    } catch(error) {
        next(sendError(500, 'Failed to get users information.', error.message))
    }
})

server.get('/users/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const response = await(db('Users').where({id: Number(id)}));
        if (response.length === 0) {
            return next(sendError(404, 'Failed to retrieve user information', 'The user for this specific Id does not exists.'))
        }
        res.status(200).json(response[0]);
    } catch(error) {
        next(sendError(500, 'Failed to get user information.', error.message))
    }
})

server.post('/users', async (req, res, next) => {
    if (!req.body.name) {
        return next(sendError(400, 'Failed to add user to database.', 'Please provide user name.'))
    }

    const newUser = req.body;

    try {
        const response = await (db('Users').insert(newUser));
        const id = response[0];
        res.status(201).json({id, ...newUser});
    } catch(error) {
        next(sendError(500, 'Failed to add user to database.', error.message))
    }
})

server.delete('/users/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const response = await(db('Users').where('id', id).del());
        if (response === 0) {
            return next(sendError(404, 'Failed to remove user.', 'The user for this specific Id does not exists.'))
        }
        res.status(200).json(response);
    } catch(error) {
        next(sendError(500, 'Failed to remove user.', error.message))
    }
})

server.put('/users/:id', async (req, res, next) => {
    if (!req.body.name) {
        return next(sendError(400, 'Failed to update user.', 'Please provide user name.'))
    }
    
    const id = req.params.id;
    const changes = req.body;
    
    try {
        const response = await(db('Users').where('id', id).update(changes));
        console.log(response);
        if (response === 0) {
            return next(sendError(404, 'Failed to update user', 'The user for this specific Id does not exists.'))
        }
        res.status(200).json(response);
    } catch(error) {
        next(sendError(500, 'Failed to update user.', error.message))
    }
})

server.use((err, req, res, next) => {
    res.status(err.code).send({message: err.message, error: err.error})
})

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
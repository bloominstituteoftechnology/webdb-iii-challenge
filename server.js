const express = require('express');
const server = express();
const helmet = require('helmet');

//Routes
const UserRoutes = require('./ServerRouters/UserRoutes');
const PostRoutes = require('./ServerRouters/PostRoutes');
const TagRoutes = require('./ServerRouters/TagRoutes');

//middleware
server.use(express.json());
server.use(helmet());

function sendError(code, message, error) {
    return {
        code: code,
        message: message,
        error: error
    }
}


server.get('/', (req, res) => {
    res.send('Welcome to Lambda Forum')
})

// USERS ENDPOINTS
server.use('/users', UserRoutes);

// POSTS ENDPOINTS
server.use('/posts', PostRoutes);

// TAGS ENDPOINTS
server.use('/tags', TagRoutes);

// ERROR HANDLER
server.use((err, req, res, next) => {
    res.status(err.code).send({message: err.message, error: err.error})
})

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
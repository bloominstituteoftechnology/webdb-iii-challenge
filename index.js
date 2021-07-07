const express = require('express');
const helmet = require('helmet');
const postsDb = require('./data/helpers/postsDb');
const tagsDb = require('./data/helpers/tagsDb');
const usersDb = require('./data/helpers/usersDb');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.send('up and running');
});

//USERS.GET

//USERS.GET
server.get('/users/', (req, res) => {
    const id = req.params.id;
    const name = req.params.name;

    userDb.get(id).then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => res.send(err));
})


const port = 8000;

server.listen( port, function() {
    console.log(`\n === Web API Listening on http://localhost:${port} === \n`);
});
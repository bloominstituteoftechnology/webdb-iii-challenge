const express = require('express');
const bodyParser = require('body-parser');

const sqlite = require('sqlite3');
const knex = require('./db.js');

const server = express();

server.use(bodyParser.json());


// // endpoints here
server.get('/users', function(req, res) {
    const users = knex('users')
        .then(function(records) {
            res.status(200).json(records);
        })
        .catch(function(error) {
            res.status(500).json({ error });
        });
});

server.get('/users/:id', function(req, res) {
    const { id } = req.params;

    const users = knex('users')
        .where('id', id)
        .then(function(records) {
            res.status(200).json(records);
        })
        .catch(function(error) {
            res.status(500).json({ error });
        });
});

server.post('/users', function(req, res) {
    const user = req.body;
    knex
        .insert(user)
        .into('users')
        .then(function(ids) {
            res.status(201).json({ ids: ids });
        })
        .catch(function(err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'The User already exist' });
            } else {
                res.status(500).json(err);
            }
        });
});

server.post('/posts', function(req, res) {
    const post = req.body;
    knex
        .insert(post)
        .into('posts')
        .then(function(text) {
            res.status(201).json({ text: text });
        })
        .catch(function(err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'The Post already exist' });
            } else {
                res.status(500).json(err);
            }
        });
});

server.get('/users/:id/posts', function(req, res) {
    const { id } = req.params;

    const posts = knex('posts')
        .where('usersid', id)
        .then(function(records) {
            res.status(200).json(records);
        })
        .catch(function(error) {
            res.status(500).json({ error });
        });
});

server.delete('/zoos/:id', function(req, res) {
    knex('zoos')
        .where('id', req.params.id)
        .del()
        .then(function(count) {
            res.status(200).json({ deleted: count });
        })
        .catch(function(err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'The Zoo already exist' });
            } else {
                res.status(500).json(err);
            }
        });
});
// server.put('/zoos/:id', function(req, res) {
//     knex('zoos')
//         .where('id', req.params.id)
//         .update(req.body)
//         .then(function(count) {
//             res.status(200).json({ updated: count });
//         })
//         .catch(function(err) {
//             if (err.code === 'SQLITE_CONSTRAINT') {
//                 res.status(422)
//                     .json({ error: 'The Zoo already exist' });
//             } else {
//                 res.status(500).json(err);
//             }
//         });
// });

// server.delete('/zoos/:id', function(req, res) {
//     knex('zoos')
//         .where('id', req.params.id)
//         .del()
//         .then(function(count) {
//             res.status(200).json({ deleted: count });
//         })
//         .catch(function(err) {
//             if (err.code === 'SQLITE_CONSTRAINT') {
//                 res.status(422).json({ error: 'The Zoo already exist' });
//             } else {
//                 res.status(500).json(err);
//             }
//         });
// });

// // server.get('/', function(req, res) {
// //     // console.log(knex('zoos').where('id', 6).toString());
    
// //     knex('zoos')
// //         .join('bears', 'zoos.id', '=', 'bears.zooId')
// //         .select('zoos.*', 'bears.species')
// //         .then(function(records) {
// //             res.status(200).json(records);
// //         });

//     // knex
//     //     .select()
//     //     .from('bears')
//     //     // .groupBy('zooId')
//     //     // .orderBy('species','desc')
//     //     // .limit(2)
//     //     // .offset(4)
//     //     .then(function(records) {
//     //         res.status(200).json(records);
//     //     });

//     // using parenthesis and logic
//     // knex('students')
//     //     .where(function() {
//     //         this.where('age', '<=', 35).orWhere('age', '>=' 18)
//     //     })
//     //     .orWhere('age', '>', 60);

//     // res.status(200).json({ success: true });
// //});

const port = 3000;
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});
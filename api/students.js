const express = require('express'),
    router = express.Router();


router
    .post('/', function (req, res) {
        return knex('students')
            .insert(req.body)
            .then(count => {
                res.status(200).json(count);
            })
            .catch(err => {
                res.status(500).json(err);
            });

    })
    .get('/', function (req, res) {
        return knex.select().from('students')
    })

    .get('/:id', function (req, res) {
        let id = req.params.id;

        return knex('students')
            .where('id', id)
            .select()
    })
    .put('/:id', function (req, res) {
        let id = req.params.id;

        return knex('students')
            .table('students')
            .where('id', '=', id)
            .update(req.body)
            .then(count => {
                res.status(200).json(count);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    })
    .delete('/:id', function (req, res) {
        let id = req.params.id;

        return knex('students')
            .where({ id })
            .del()
            .then(count => {
                res.status(200).json(count);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    });


module.exports = router;
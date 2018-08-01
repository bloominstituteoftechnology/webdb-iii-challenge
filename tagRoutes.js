const express = require('express');
const db = require('./data/db');
const tagrouter = express.Router();



tagrouter.get('/', (req, res) => {
        db('tags')
        .then(response => {
                res.status(200).json(response);
        })

        .catch(err => res.status(500).json(err));

});


tagrouter.get('/:id', (req, res) => {

        const id = req.params.id;

        db('tags')
        .where('id',id)
        .then(response => {
                if(response.length ===0) res.status(404).json({message: "Tag with the specified ID does not exist." })
                else res.status(200).json(response);
        })

        .catch(err => res.status(500).json(err));

});




module.exports = tagrouter;


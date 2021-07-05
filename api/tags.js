const express = require('express');
const db = require('./../data/db.js');

const router = express.Router();



router.get('/', (req, res) => {
    db('tags')
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The tags information could not be retrieved.'})
    })
})


router.get('/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(404).json({error: 'The tag with the specified ID does not exist.'})
        return;
    }
    db('tags')
    .where({id: Number(id)})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The tag information could not be retrieved.'})
    })
})


router.post('/', (req, res) => {
    const tag = req.body;
    if(tag.tag.length > 16) {
        res.status(400).json({error: 'Tag must be less than 16 characters.'})
        return;
    }
    db.insert(tag).into('tags').then(ids => {
        const id = ids[0];
        db.insert({tagId: id}).into('connect')
        res.status(201).json({ id, ...tag})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


router.put('/:id', (req, res) => {
    const id = req.params.id;
    const tag = req.body;
    if(!id){
        res.status(404).json({error: 'The tag with the specified ID does not exist.'})
        return;
    }
    if(tag.tag.length > 16) {
        res.status(400).json({error: 'Tag must be less than 16 characters.'})
        return;
    }
    db('tags')
    .where({id: Number(id)})
    .update(tag)
    .then(response => {
        res.status(201).json({response})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

/* *************************** DELETE ENDPOINTS ****************************/


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(404).json({error: 'The tag with the specified ID does not exist.'})
        return;
    }
    db('tags')
    .where({id: Number(id)})
    .delete()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error deleting tag.'})
    })
})

module.exports = router;
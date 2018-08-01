const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
  db('users')
    .then( user => res.status(200).json(user) )
    .catch( err => res.status(500).json(err) )
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  db('users')
    .where({id})
    .then( user => res.status(200).json(user) )
    .catch( err => res.status(500).json(err) )
})
  
router.get('/:id/posts', (req,res) => {
  const id = req.params.id
  db
    .select('*')
    .from('posts')
    .leftJoin('users', 'posts.user_id','users.id')
    .where({'users.id' : id})
    .then( data => res.status(200).json(data) )
    .catch( err => res.status(400).json({err}) )
})

router.post('/', (req,res) => {
  const body = req.body
  if (!body.name) res.status(400).json({err: 'Field required.'})
  let id = 0;
  db.insert(body)
    .into('users')
    .then( data => id = data[0] )
    .then( () => {
      db('users')
        .where({id})
        .then( user => res.status(200).json(user) )
        .catch( err => res.status(500).json(err) )
    })
    .catch( err => res.status(500).json(err) )
})

router.put('/:id', (req,res) => {
  const id = req.params.id
  const body = req.body
  if (!body.name) res.status(400).json({err: 'Field required.'})
  else {
    db('users')
      .where({id})
      .update(body)
      .then(user => {
        if (user > 0) res.status(200).json({message: 'User updated!'}) 
        else res.status(400).json({err: 'ID not found!'})
      })
      .catch( err => res.status(500).json(err))
  }
})

router.delete('/:id', (req,res) => {
  const id = req.params.id
  db('users')
    .where({id})
    .del()
    .then( data => {
      if (data === 1){
        res.status(201).json({message: 'User has been deleted!'})
      }else {
        res.status(400).json({message: 'User not found!'})
      }
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router;
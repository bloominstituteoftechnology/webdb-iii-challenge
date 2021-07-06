const express = require('express');

const db = require('../db')

const user = express.Router();

user.get('/', (req,res) => {
  db('users')
    .then( user => res.status(200).json(user) )
    .catch( err => res.status(500).json(err) )
})

user.get('/:id', (req,res) => {
  const id = req.params.id

  db('users')
    .where({id})
    .then( user => res.status(200).json(user) )
    .catch( err => res.status(500).json(err) )
})

user.get('/:id/posts', (req,res) => {
  const id = req.params.id

  db
    .select('*')
    .from('posts')
    .leftJoin('users', 'posts.user_id','users.id')
    .where({'users.id' : id})
    .then( data => res.status(200).json(data) )
    .catch( err => res.status(400).json({err}) )
})

user.put('/:id', (req,res) => {
  const id = req.params.id
  const body = req.body

  if (!body.name) res.status(400).json({err: 'The name property is required in this endpoint'})
  
  else {

    db('users')
      .where({id})
      .update(body)
      .then( user => {
        if (user > 0) res.status(200).json({message: `${user} user record(s) updated`}) 
        
        else res.status(400).json({err: 'The ID provided was not found'})
      })
      .catch( err => res.status(500).json(err) )
  }
})

user.post('/', (req,res) => {
  const body = req.body

  if (!body.name) res.status(400).json({err: 'The name property is required in this endpoint'})

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

user.delete('/:id', (req,res) => {
  const id = req.params.id

  db('users')
    .where({id})
    .del()
    .then( data => {
      if (data === 1){
        res.status(201).json({message: `1 user deleted`})
      }else {
        res.status(400).json({message: 'User with that ID not found'})
      }
    })
    .catch(err => res.status(500).json(err))
})

module.exports = user
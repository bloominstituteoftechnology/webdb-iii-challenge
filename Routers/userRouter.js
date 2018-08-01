const express = require('express');

const db = require('../db')

const user = express.Router();

user.get('/', (req,res) => {
  db('users')
    .then( user => {
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json(err))
})

user.get('/:id', (req,res) => {
  const id = req.params.id

  db('users')
    .where({id})
      .then( user => {
        res.status(200).json(user)
      })
      .catch(err => res.status(500).json(err))
})

user.get('/:id/posts', (req,res) => {
  const id = req.params.id

  db
    .select('*')
    .from('posts')
    .leftJoin('users', 'posts.user_id','users.id')
    .where({'users.id' : id})
    .then( data => {
      res.status(200).json(data)      
    })

})

user.put('/:id', (req,res) => {
  const id = req.params.id

  db('users')
    .where({id})
    .update({name: "The Godfather"})
      .then( user => {
        res.status(200).json(`message: ${user} user record updated`)
      })
      .catch(err => res.status(500).json(err))
})


user.post('/', (req,res) => {
  const user = req.body

  db.insert(user)
    .into('users')
    .then( data => {
      if (data.length === 1){
        res.status(201).json({message: `1 user added with ID = ${data[0]}`})
      }
    })
    .catch(err => res.status(500).json(err))
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
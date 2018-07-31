const express = require('express');

const db = require('../db');

const tag = express.Router();

tag.get('/', (req,res) => {
  db('tags')
    .then( tag => {
      res.status(200).json(tag)
    })
    .catch(err => res.status(500).json(err))
})

// tag.get('/:id', (req,res) => {
//   const id = req.params.id

//   db('tags')
//     .where({id})
//       .then( tag => {
//         if (tag.length > 0){
//           res.status(200).json(tag)
//         }else{
//           res.status(400).json({err: 'That tag ID was not found'})
//         }
        
//       })
//       .catch(err => res.status(500).json(err))
// })

// tag.put('/:id', (req,res) => {
//   const id = req.params.id
//   const body= req.body

//   db('tags')
//     .where({id})
//     .update(body)
//       .then( tag => {
//         console.log(tag)
//         if (tag === 1){
//           res.status(200).json(`message: ${tag} tag record updated`)
//         }
//         else {
//           res.status(400).json(`message: the tag id was not found`)
//         }
//       })
//       .catch(err => res.status(500).json(err))
// })


tag.post('/', (req,res) => {
  const tag = req.body

  if (!tag.tag) {
    res.status(400).json({err: 'The tag property is required in this endpoint'})
  }else {
    db.insert(tag)
      .into('tags')
      .then( data => {
        if (data.length === 1){
          res.status(201).json({message: `1 tag added with ID = ${data[0]}`})
        }
      })
      .catch(err => res.status(500).json(err))
  }
})

// tag.delete('/:id', (req,res) => {
//   const id = req.params.id

//   db('tags')
//     .where({id})
//     .del()
//     .then( data => {
//       if (data === 1){
//         res.status(201).json({message: `1 tag deleted`})
//       }else {
//         res.status(400).json({message: 'tag with that ID not found'})
//       }
//     })
//     .catch(err => res.status(500).json(err))
// })

module.exports = tag
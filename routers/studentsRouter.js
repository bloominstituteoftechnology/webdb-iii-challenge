//create router
const express = require('express');
const router = express.Router();

//create db/knex connection
const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

//********** */Route Handlers / Endpoints

//**GET - SELECT */

router.get('/', (req, res) =>{
    db('students')
    .then(students =>{
        res.status(200).json(students)
    })
    .catch(err =>{
        res.status(500).json({error: "Unable to retrieve students"})
    })
})

//*** *SELECT/GET BY ID 
router.get('/:id', (req,res) =>{
    const id = req.params.id

    db('students')
    .where('id', id)
    .then(student => {
        if(student[0]){
           res.status(200).json(student);
        }else {
            res.status(404).json({error: "The specified student does not exist"});
        }
    })
    .catch(err =>{
        res.status(500).json({error: "Unable to retrieve specified student"})
    })
})

//*** INSERT*/
router.post('/', (req, res) =>{
    const newStudent = req.body;

    db('students')
    .insert(newStudent)
    .then(id =>{
        res.status(201)
        res.json(id)
    })
    .catch(err =>{
        res.status(500).json({error: "Unable to create new student"})
    })

    
})

//***UPDATE */
router.put('/:id', (req,res) =>{
    const id = req.params.id;
    const updatedStudent = req.body;

    db('students')
    .where('id', id)
    .update(updatedStudent)
    .then(count =>{
        if(count){
            res.status(200).json(count)
        }else {
            res.status(404).json({error: "The specified student does not exist"})
        }
    })
    .catch(err =>{
        res.status(500).json({error: "Unable to update the specified student"})
    })
})

//**DELETE */
router.delete('/:id', (req, res) =>{
    const id = req.params.id;

    db('students')
    .where('id', id)
    .del()
    .then(count =>{
        if(count){
            res.status(200).json(count)
        }else{
            res.status(404).json({error: "The specified student does not exist"})
        }
    })
    .catch(err =>{
        res.status(500).json({error: "Unable to delete the specified student"})
    })
})

module.exports = router;


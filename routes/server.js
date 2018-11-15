const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile'); 
const db = knex(knexConfig.development);

module.exports = function(db){
    const router = express.Router();
    router.get('/', getAll )
     router.post('/', postData)
    router.get('/:id', getById)
    router.put('/:id', putData)
    router.delete('/:id', deleteData) 

    return router;
}


const getAll = async (req, res) => {
    let cohorts = 'cohorts';
    let students = 'students';
    let tableName = req.baseUrl.includes(`${cohorts}`) ? cohorts : 
                    req.baseUrl.includes(`${students}`) ? students :
                    null;
    

    try{console.log(tableName)
        let allData = await db.table(tableName);
        res.status(200).json(allData)
    }

    catch(err){
        res.status(500).json({message: 'There was an error retrieving the data.'})
    }

}

 async function postData(req,res){
    let cohorts = 'cohorts';
    let students = 'students';
    let tableName = req.baseUrl.includes(`${cohorts}`) ? cohorts : 
                    req.baseUrl.includes(`${students}`) ? students :
                    null;
    let data = req.body;
    try {
        let posted = await db.select().table(tableName).insert(data)
        res.status(200).json(posted)
    }
    catch(err){
        res.status(500).json({message: 'There was an error retrieving the data.'})
    }

}

const getById = async (req,res) => {
    let cohorts = 'cohorts';  
    let students = 'students';
    let tableName = req.baseUrl.includes(`${cohorts}`) ? cohorts : 
                    req.baseUrl.includes(`${students}`) ? students :
                    null;
    let {id} = req.params; 
    try{
        let data = await db(tableName).where({id})
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json({message: 'There was an error retrieving the data.'})
    }
}

const putData = async (req,res) => {
    let cohorts = 'cohorts';  
    let students = 'students';
    let tableName = req.baseUrl.includes(`${cohorts}`) ? cohorts : 
                    req.baseUrl.includes(`${students}`) ? students :
                    null;
    let {id} = req.params; 
    try{
        let data = await db(tableName).where({id}).update(req.body)
        res.status(200).json({message: 'Data changed successfully.'})
    }
    catch(err){
        res.status(500).json({message: 'There was an error retrieving the data.'})
    }
}

const deleteData = async (req,res) => {
    let cohorts = 'cohorts';  
    let students = 'students';
    let tableName = req.baseUrl.includes(`${cohorts}`) ? cohorts : 
                    req.baseUrl.includes(`${students}`) ? students :
                    null;
    let {id} = req.params; 
    try{
        let data = await db(tableName).where({id}).del()
        res.status(200).json({message: 'Data deleted successfully.'})
    }
    catch(err){
        res.status(500).json({message: 'There was an error retrieving the data.'})
    }
}

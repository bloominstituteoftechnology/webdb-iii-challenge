const express = require('express')
const db = require('../data/db')
const router = express.Router()


// ******************************  Error Constants ********************************************

const SUCCESS = 200
const INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
const MISSING_TAG = "MISSING_TAG"
const INVALID_TAG_ID = "INVALID_TAG_ID"


// ******************************  MiddleWare ********************************************


const getTag = async (req, res, next) => {
    let { id } = req.params
    let error = INVALID_TAG_ID
    
    try{
        const tagIn = await db('tags').where({id})
        if(tagIn.length < 1){ throw Error() }
        error = INTERNAL_SERVER_ERROR
        req.tagIn = tagIn

        next();
    }catch(err){
        next({error: error, internalError: err.message})
    }
}


// ******************************  Tags ********************************************

router.get('/', async (req, res, next) => {
    let error = INTERNAL_SERVER_ERROR

    try{
        const tags = await db('tags')
        res.status(SUCCESS).json(tags)
    }catch(err){
        next({error: error, internalError: err.message})    }
})

router.get('/:id', getTag, async (req, res, next) => {
    // getTag has already validated tag and assigned to req.tagIn
    let error = INTERNAL_SERVER_ERROR

    try{
        res.status(SUCCESS).json(req.tagIn)
    }catch(err){
        next({error: error, internalError: err.message})    }
})

router.post('/', async (req, res, next) => {
    const { tag } = req.body
    let error = MISSING_TAG

    try{
        if( !tag ){ throw Error() }
        error = INTERNAL_SERVER_ERROR

        const newTag = {...req.body}
        await db.insert(newTag)
        res.status(SUCCESS).json(newTag)
    }catch(err){
        next({error: error, internalError: err.message})    }
})

router.put('/:id', getTag, async (req, res, next) => {
    try{
        const updated = {...req.body}
        await db.update(req.params.id, updated)
        res.status(SUCCESS).json(updated)
    }catch(err){
        next({error: INTERNAL_SERVER_ERROR, internalError: err.message})    }
})

router.delete('/:id', getTag, async (req, res, next) => {
    try{
        await db.remove(req.params.id)
        res.status(SUCCESS).json({"Removed": req.tagIn})
    }catch(err){
        next({error: INTERNAL_SERVER_ERROR, internalError: err.message})    }
})

module.exports = router
const express = require('express')
const db = require('../data/db')
const router = express.Router()


// ******************************  Error Constants ********************************************

const SUCCESS = 200
const INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
const INVALID_USER_ID = "INVALID_USER_ID"
const MISSING_NAME = "MISSING_NAME"



// ******************************  Middleware ********************************************

// Checks for user by ID and adds to req.userIn
// Use to confirm valid user
const getUser = async (req, res, next) => {
    const { userId } = req.body
    const { id } = req.params
    let error = INVALID_USER_ID

    try{
        const userIn = await db('users').where({id : (userId || id)})
        if(userIn.length < 1){ throw Error() }
        error = INTERNAL_SERVER_ERROR

        req.userIn = userIn

        next();
    }catch(err){
        next({error: error, internalError: err.message})    }
}



// ******************************  Users ********************************************

router.get('/', async (req, res, next) => {
    let error = INTERNAL_SERVER_ERROR

    try{
        const users = await db('users')
        res.status(SUCCESS).json(users)
    }catch(err){
        next({error: error, internalError: err.message})    }
})

router.get('/:id', getUser, async (req, res, next) => {
    // getUser validates and assigns user to req.userIn
    let error = INTERNAL_SERVER_ERROR

    try{
        res.status(SUCCESS).json(req.userIn)
    }catch(err){
        next({error: error, internalError: err.message})    }
})

// Get all posts for a user
router.get('/:id/posts', getUser, async (req, res, next) => {
    try{
        const posts = await db.getUserPosts(req.params.id)
        res.status(SUCCESS).json(posts)
    }catch(err){
        next({error: INTERNAL_SERVER_ERROR, internalError: err.message})    }
})

router.post('/', async (req, res, next) => {
    const { name } = req.body
    let error = MISSING_NAME

    try{
        if( !name ){ throw Error() }
        error = INTERNAL_SERVER_ERROR

        const newUser = {...req.body}
        await db('users').insert(newUser)
        res.status(SUCCESS).json(newUser)
    }catch(err){
        next({error: error, internalError: err.message})    }
})

router.put('/:id', getUser, async (req, res, next) => {
    try{
        const updated = {...req.body}
        await db.update(req.params.id, updated)
        res.status(SUCCESS).json(updated)
    }catch(err){
        next({error: INTERNAL_SERVER_ERROR, internalError: err.message})    }
})

router.delete('/:id', getUser, async (req, res, next) => {
    try{
        await db.remove(req.params.id)
        res.status(SUCCESS).json({"Removed": req.userIn})
    }catch(err){
        next({error: INTERNAL_SERVER_ERROR, internalError: err.message})    }
})


module.exports = router
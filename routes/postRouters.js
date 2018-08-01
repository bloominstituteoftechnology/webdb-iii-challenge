const express = require('express')
const db = require('../data/db')
const router = express.Router()


// ******************************  Error Constants ********************************************

const SUCCESS = 200
const INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
const INVALID_POST_ID = "INVALID_POST_ID"
const INVALID_USER_ID = "INVALID_USER_ID"
const MISSING_TEXT_OR_ID = "MISSING_TEXT_OR_ID"
const INVALID_TAG_ID = "INVALID_TAG_ID"



// ******************************  MiddleWare ********************************************

// local middleware checks for specific post by ID and adds to req.postIn
// Use to confirm we have a valid post
const getPost = async (req, res, next) => {
    let { id } = req.params
    let error = INVALID_POST_ID
    
    try{
        const postIn = await db('posts').where({id})
        if(postIn.length < 1){ throw Error() }
        error = INTERNAL_SERVER_ERROR
        req.postIn = postIn  

        next();
    }catch(err){
        next({error: error, internalError: err.message})
    }
}

// Checks for user by ID and adds to req.userIn
// Use to confirm valid user
const getUser = async (req, res, next) => {
    const { userId } = req.body
    let error = INVALID_USER_ID

    try{
        const userIn = await db('users').where({id : userId})
        if(userIn.length < 1){ throw Error() }
        error = INTERNAL_SERVER_ERROR

        req.userIn = userIn

        next();
    }catch(err){
        next({error: error, internalError: err.message})    }
}

// Used to validate posts tags on input
const getTags = async (req, res, next) => {
    let tags = JSON.parse(req.body.tags)
    let error = INVALID_TAG_ID
    
    try{
        tagsIn = await db('tags').whereIn('id', tags)
        // Check to see all our body tags returned from the database
        if(tagsIn.length < 1 || tagsIn.length < tags.length){ throw Error() }
        error = INTERNAL_SERVER_ERROR
        req.tagsIn = tagsIn

        next();
    }catch(err){
        next({error: error, internalError: err.message})
    }
}



// ******************************  Posts ********************************************

router.get('/', async (req, res, next) => {
    let error = INTERNAL_SERVER_ERROR

    try{
        let posts = await db('posts')
        console.log(posts)
        // Convert stringified tags back to objects
        posts = posts.map(post => {return {...post, tags: JSON.parse(post.tags)}})
        res.status(SUCCESS).json(posts)
    }catch(err){
        next({error: error, internalError: err.message})
    }
})

router.get('/:id', getPost, (req,res, next) => {
    let error = INTERNAL_SERVER_ERROR

    try{
        res.status(SUCCESS).json({...req.postIn, tags: JSON.parse(post.tags)})
    }catch(err){
        next({error: error, internalError: err.message})
    }
})

// Get all tags for a post
router.get('/:id/tags', getPost, async (req, res, next) => {
    let error = INTERNAL_SERVER_ERROR

    try{
        let tags = JSON.parse(req.postIn[0].tags)
        res.status(SUCCESS).json(tags)
    }catch(err){
        next({error: error, internalError: err.message})
    }
})

router.post('/', getUser, getTags, async (req, res, next) => {
    // getUser has already validated we have a valid user
    const { text, userId } = req.body
    let error = MISSING_TEXT_OR_ID

    try{
        if(!text || !userId){ throw Error() }   // throw if missing information

        const postOut = {...req.body, tags: req.tagsIn}
        error = INTERNAL_SERVER_ERROR           

        await db('posts').insert({...postOut, tags: JSON.stringify(req.tagsIn)})
        res.status(SUCCESS).json({Added: postOut})
    }catch(err){
        next({error: error, internalError: err.message})    }
})

router.put('/:id', getPost, getUser, async (req, res, next) => {
    // getPost checks for valid post, getUser a valid user (if they try to update userId)
    const id = req.params.id

    try{
        const updated = {...req.body} 
        await db('posts').where({id}).update(updated); 
        res.status(SUCCESS).json(updated)
    }catch(err) {
        next({error: INTERNAL_SERVER_ERROR, internalError: err.message})    }
})

router.delete('/:id', getPost, async (req, res, next) => {
    const id = req.params.id

    try{
        await db('posts').where({id}).del()
        res.status(SUCCESS).json({"Removed": req.postIn})
        
    }catch(err){
        next({error: INTERNAL_SERVER_ERROR, internalError: err.message})    }
})

module.exports = router
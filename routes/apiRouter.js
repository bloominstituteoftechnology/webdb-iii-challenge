const express = require('express')
const users = require('./userRouters')
const posts = require('./postRouters')
const tags = require('./tagRouters')

const api = express.Router()

api.use('/users', users)
api.use('/posts', posts)
api.use('./tags', tags)


// ******************************  Error Handler ********************************************

server.use(( err, req, res ) => {
    switch(err.error) {
        case MISSING_TEXT_OR_ID:
            res.status(400).send({
                success: false,
                description: "Please include valid text and a valid ID of a user",
                internal_error: err.internalError 
            })
        case MISSING_NAME:
            res.status(400).send({
                success: false,
                description: "Please include a valid name for a user",
                internal_error: err.internalError 
            })
        case MISSING_TAG:
            res.status(400).send({
                success: false,
                description: "Please include a valid tag",
                internal_error: err.internalError 
            })
        case INVALID_USER_ID:
            res.status(400).send({
                success: false,
                description: "No user by that ID",
                internal_error: err.internalError
            })
        case INVALID_POST_ID:
            res.status(400).send({
                success: false,
                description: "No post by that ID",
                internal_error: err.internalError
            })
        case INVALID_TAG_ID:
            res.status(400).send({
                success: false,
                description: "No tag by that ID",
                internal_error: err.internalError
            })
        case INTERNAL_SERVER_ERROR:
            res.status(500).send({
                success: false,
                description: "Internal Server Error",
                internal_error: err.internalError
            })
    }
})

module.exports = api
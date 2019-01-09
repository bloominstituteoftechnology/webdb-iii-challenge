const express = require('express');
const server = express();

server.get('/', (req,res) => {
        res.json({api : "Lambda Student/Cohort Data!!!"})
})      

module.exports = server;


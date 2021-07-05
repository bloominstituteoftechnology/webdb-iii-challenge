const helmet = require('helmet');
const express = require('express');
const cohortsRoutes = require('../routes/cohortsRoutes.js');

module.exports = server =>{
    server.use(helmet());
    server.use(express.json());
    server.use('/api/cohorts', cohortsRoutes);
}
const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {
    findChrt,
    findChrtById,
    findChrtStdt,
    addChrt,
    updateChrt,
    removeChrt,
    findStdt,
    findStdtById,
    addStdt,
    updateStdt,
    removeStdt,
}

function findChrt() {
    return db('chrt');
}

function findChrtById(id) {
    return db('chrt')
        .where({ id })
        .first();
}

function findChrtStdt(chrt_id) {
    return db('stdt')
        .where('chrt_id', chrt_id);
}

function addChrt(chrt) {
    return db('chrt')
        .insert(chrt)
        .into('chrt')
}

function updateChrt(id, changes) {
    return db('chrt')
        .where({ id })
        .update(changes)
}

function removeChrt(id) {
    return db('chrt')
        .where({ id })
        .del();
}

function findStdt() {
    return db('stdt');
}

function findStdtById(id) {
    return db('stdt')
        .where({ id })
        .first();
}

function addStdt(stdt) {
    return db('stdt')
        .insert(stdt)
        .into('stdt')
}

function updateStdt(id, changes) {
    return db('stdt')
        .where({ id })
        .update(changes)
}

function removeStdt(id) {
    return db('stdt')
        .where({ id })
        .del();
}
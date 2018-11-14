

//== Knex Database Builder =====================================================

//-- Dependencies --------------------------------
const knex       = require('knex'          );
const knexConfig = require('../knexfile.js');

//-- Configure Knex Database ---------------------
const knexDB = knex(knexConfig.development);

//-- Export Database Access Builder --------------
module.exports = function (tableName/*, options*/) {
    return new DatabaseIntermediary(knexDB, tableName);
};


//== Database Intermediary Class ===============================================

class DatabaseIntermediary {
    constructor(knexDatabase, tableName) {
        this.db    = knexDatabase;
        this.table = tableName   ;
    }
    // Throw all errors as promise rejections
    async get(itemId){
        // Get just one item by Id
        if(itemId){
            let result = await this.db(this.table).where({id: itemId});
            return result[0];
        }
        // Get all Items as an array
        return await this.db(this.table);
    }
    async insert(item){
        return await this.db(this.table).insert(item);
    }
    async update(itemId, itemData){
        return await this.db(this.table).where({id: itemId}).update(itemData);
    }
    async remove(itemId){
        return await this.db(this.table).where({id: itemId}).del();
    }
};

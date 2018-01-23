
exports.up = function (knex, Promise) {
    return knex.schema.createTable('tags', function (tbl) {
        tbl.increments('id');
        tbl.integer('user-id').references('uid').inTable('users')
        tbl.string('tag', 255).notNullable().unique('tag', 'uq_tag_name');
        tbl.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('tags');

};

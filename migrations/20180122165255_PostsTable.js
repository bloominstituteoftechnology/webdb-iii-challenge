
exports.up = function (knex, Promise) {
    return knex.schema.createTable('posts', function (tbl) {
        tbl.increments('id');
        tbl.integer('userid').references('id').inTable('users')
        tbl.string('post', 255).notNullable().unique('post', 'uq_post_name');
        tbl.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('posts');

};


exports.seed = function(knex, Promise) {
    return knex('users').del()
    .then(function () {
        return knex('users').insert([
            {name: 'Charlie'},
            {name: 'Mike'},
            {name: 'Mary'}
        ]);
    });
};
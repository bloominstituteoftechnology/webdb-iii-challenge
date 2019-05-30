exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('cohorts').truncate().then(function() {
		// Inserts seed entries
		return knex('cohorts').insert([ { name: 'WebPt4' }, { name: 'Web19' }, { name: 'iOS4' } ]);
	});
};

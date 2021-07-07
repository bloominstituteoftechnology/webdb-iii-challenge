exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex("students")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("students").insert([
				{ name: "Patrick", cohort_id: 1 },
				{ name: "Danny", cohort_id: 1 },
				{ name: "Joseph", cohort_id: 1 }
			]);
		});
};

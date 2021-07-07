exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex("students")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("students").insert([
				{ name: "Trevor", cohort_id: 1 },
				{ name: "Lauren", cohort_id: 1 },
				{ name: "Ash", cohort_id: 1 },
				{ name: "Boy", cohort_id: 2 },
				{ name: "Girl", cohort_id: 2 },
				{ name: "Cow", cohort_id: 2 },
				{ name: "Mom", cohort_id: 3 },
				{ name: "Dad", cohort_id: 3 },
				{ name: "Sister", cohort_id: 3 },
			]);
		});
};

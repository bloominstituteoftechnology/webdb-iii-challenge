
exports.seed = function (knex, Promise) {
  return knex('students')
    .truncate()
    .then(function () {
      return knex('students').insert([
        { "name": "Latisha Slowey", "cohort_id": 7 },
        { "name": "Pietro Shepherd", "cohort_id": 3 },
        { "name": "Broddie Dallicoat", "cohort_id": 9 },
        { "name": "Connor Bastock", "cohort_id": 8 },
        { "name": "Norah Prendergast", "cohort_id": 5 },
        { "name": "Timothy Sill", "cohort_id": 5 },
        { "name": "Dorree Tremaine", "cohort_id": 5 },
        { "name": "Brier Moorman", "cohort_id": 10 },
        { "name": "Costa Lonnon", "cohort_id": 6 },
        { "name": "Joseph Inker", "cohort_id": 14 },
        { "name": "Venus Pickup", "cohort_id": 11 },
        { "name": "Hewitt Trenholme", "cohort_id": 6 },
        { "name": "Kort O'Hagirtie", "cohort_id": 3 },
        { "name": "Greggory Dunn", "cohort_id": 2 },
        { "name": "Clementine Sacks", "cohort_id": 13 },
        { "name": "Thorn Wadge", "cohort_id": 4 },
        { "name": "Normy Liccardi", "cohort_id": 9 },
        { "name": "Bertine Lazar", "cohort_id": 8 },
        { "name": "Hana Chipp", "cohort_id": 12 },
        { "name": "Georg Morffew", "cohort_id": 12 },
        { "name": "Axe Philps", "cohort_id": 8 },
        { "name": "Bree Hulk", "cohort_id": 2 },
        { "name": "Cordula Frow", "cohort_id": 6 },
        { "name": "Nealson Bellwood", "cohort_id": 7 },
        { "name": "Kelcie Dayment", "cohort_id": 1 },
        { "name": "Marie-jeanne Smullen", "cohort_id": 4 },
        { "name": "Sofia Yerrall", "cohort_id": 6 },
        { "name": "Yves Paramore", "cohort_id": 16 },
        { "name": "Fannie Rushmer", "cohort_id": 7 },
        { "name": "Corbie Weekland", "cohort_id": 6 },
        { "name": "Ailsun Perl", "cohort_id": 10 },
        { "name": "Katinka Raulston", "cohort_id": 5 },
        { "name": "Oates Crutchley", "cohort_id": 9 },
        { "name": "Mignonne Risebarer", "cohort_id": 6 },
        { "name": "Mattheus Pegrum", "cohort_id": 3 },
        { "name": "Ian Shimmin", "cohort_id": 5 },
        { "name": "Mae Rittmeier", "cohort_id": 9 },
        { "name": "Cullie Breslau", "cohort_id": 13 },
        { "name": "Heidi Moodie", "cohort_id": 16 },
        { "name": "Maryann Courtenay", "cohort_id": 10 },
        { "name": "Edithe O'Mahoney", "cohort_id": 14 },
        { "name": "Levi Reymers", "cohort_id": 8 },
        { "name": "Alon Gill", "cohort_id": 3 },
        { "name": "Esmeralda Forlong", "cohort_id": 14 },
        { "name": "Linnea Lohde", "cohort_id": 9 },
        { "name": "Monro Mougin", "cohort_id": 2 },
        { "name": "Darryl Jones", "cohort_id": 5 },
        { "name": "Malvina Bleythin", "cohort_id": 3 },
        { "name": "Arlen Lantoph", "cohort_id": 4 },
        { "name": "Ronnie Toulch", "cohort_id": 10 },
        { "name": "Doroteya Sambeck", "cohort_id": 7 },
        { "name": "Vaughn D'eath", "cohort_id": 13 },
        { "name": "Issy Stammirs", "cohort_id": 16 },
        { "name": "Theresita Jobe", "cohort_id": 14 },
        { "name": "Gayel Emery", "cohort_id": 10 },
        { "name": "Bobbie Fayers", "cohort_id": 1 },
        { "name": "Guenna Twatt", "cohort_id": 5 },
        { "name": "Roselin Fechnie", "cohort_id": 7 },
        { "name": "Heriberto Beels", "cohort_id": 8 },
        { "name": "Rickard Ghidelli", "cohort_id": 6 },
        { "name": "Wenda Sharpous", "cohort_id": 11 },
        { "name": "Izzy Gallego", "cohort_id": 3 },
        { "name": "Niki Snaddon", "cohort_id": 6 },
        { "name": "Peggie Willshire", "cohort_id": 11 },
        { "name": "Delano Rawls", "cohort_id": 14 },
        { "name": "Claire Kenward", "cohort_id": 10 },
        { "name": "Tommie Bromehead", "cohort_id": 8 },
        { "name": "Delora Mackerel", "cohort_id": 7 },
        { "name": "Sarena Hunstone", "cohort_id": 3 },
        { "name": "Gates Lorinez", "cohort_id": 6 },
        { "name": "Prince McAuliffe", "cohort_id": 8 },
        { "name": "Lolita Kernell", "cohort_id": 4 },
        { "name": "Jayne Longridge", "cohort_id": 8 },
        { "name": "Tobi Feaks", "cohort_id": 5 },
        { "name": "Hana Rankin", "cohort_id": 1 },
        { "name": "Alisha Derham", "cohort_id": 13 },
        { "name": "Sullivan Dobbie", "cohort_id": 15 },
        { "name": "Caro Frodsam", "cohort_id": 4 },
        { "name": "Leilah Clitheroe", "cohort_id": 9 },
        { "name": "Rosaleen Garland", "cohort_id": 15 },
        { "name": "Vin Barnet", "cohort_id": 8 },
        { "name": "Josefina Udden", "cohort_id": 2 },
        { "name": "Renard Bingall", "cohort_id": 8 },
        { "name": "Thia Howchin", "cohort_id": 11 },
        { "name": "Hasheem Martellini", "cohort_id": 7 },
        { "name": "Casey Casey", "cohort_id": 8 },
        { "name": "Carlye Fearon", "cohort_id": 3 },
        { "name": "Ruthie Wilsdon", "cohort_id": 2 },
        { "name": "Danni Pickersail", "cohort_id": 12 },
        { "name": "Cory Sturdgess", "cohort_id": 15 },
        { "name": "Alex Juden", "cohort_id": 4 },
        { "name": "Merv McLellan", "cohort_id": 14 },
        { "name": "Myrilla Palleske", "cohort_id": 11 },
        { "name": "Odelinda Oates", "cohort_id": 15 },
        { "name": "Codie Wortt", "cohort_id": 16 },
        { "name": "Charil Stallebrass", "cohort_id": 12 },
        { "name": "Karena Born", "cohort_id": 15 },
        { "name": "Rozelle Espinoza", "cohort_id": 1 },
        { "name": "Tori Bourdis", "cohort_id": 16 },
        { "name": "Nani MacAllester", "cohort_id": 11 }
        ]);
    });

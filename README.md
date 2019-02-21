# Building an API using a Relational Database

## Topics

x Databases
x Relational Databases
x Knex migrations.
x Seeding data.

## Assignment

Build an API that persists data to SQLite3.

Use knex migrations to create a database called `lambda.sqlite3` and add the following tables:

#### cohorts

- `id`: primary key, auto-increments.
- `name`: text, required.

#### students

- `id`: primary key, auto-increments.
- `name`: text, required.
- `cohort_id`: references the `id` in the cohorts table.

Use knex seeding feature to add test data to your tables.

Implement the following endpoints:

x `[GET] /api/cohorts` This route will return an array of all cohorts.
x `[POST] /api/cohorts` This route should save a new cohort to the database.
x `[GET] /api/cohorts/:id` This route will return the cohort with the matching `id`.
x `[GET] /api/cohorts/:id/students` returns all students for the cohort with the specified `id`.
x `[PUT] /api/cohorts/:id` This route will update the cohort with the matching `id` using information sent in the body of the request.
x `[DELETE] /api/cohorts/:id` This route should delete the specified cohort.

## Stretch Problem

Add the following endpoints.

x `[POST] /students` This route should save a new student to the database.
x `[GET] /students` This route will return an array of all students.
x `[GET] /students/:id` This route will return the student with the matching `id`.
x `[PUT] /students/:id` This route will update the student with the matching `id` using information sent in the body of the request.
x `[DELETE] /students/:id` This route should delete the specified student.

Have the student returned by the `[GET] /students/:id` endpoint include the cohort name and remove the `cohort_id` fields. The returned object should look like this:

```js
{
  id: 1,
  name: 'Lambda Student',
  cohort: 'Full Stack Web Infinity'
}
```

const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
find,
findById,
insert,
update,
remove,
getUserPosts
};

//getting user posts seperate table
function getUserPosts(userId) {
return db('posts as p')
.join('users as u', 'u.id', 'p.user_id')
.select('p.id', 'p.text', 'u.name as postedBy')
.where('p.user_id', userId);
}
////localhost:4000/api/posts?limit=3&page=2&sortby=name&sortdir=desc
//then you would just pas etc.find(req.query)
function find(query) {
const { page = 1, limit = 5, sortby = 'id', sortdir = 'asc' } = query;
const offset = limit \* (page - 1);
console.log(offset);
let rows = db('posts')
.orderBy(sortby, sortdir)
.limit(limit)
.offset(offset);
return rows;
// return db('posts'); regular
}

function findById(id) {
return db('posts').where({ id: Number(id) });
}

function insert(post) {
return db('posts')
.insert(post)
.then(ids => ({ id: ids[0] }));
}

function update(id, post) {
return db('posts')
.where('id', Number(id))
.update(post);
}

function remove(id) {
return db('posts')
.where('id', Number(id))
.del();
}

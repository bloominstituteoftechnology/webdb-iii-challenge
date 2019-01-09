# Building an API using a Relational Database

## Topics

- Databases
- Relational Databases
- Knex migrations.
- Seeding data.

## Assignment

Build an API that persists data to SQLite3.

Use knex migrations to create a database called `lambda.sqlite3` and add the following tables:

#### cohorts

- [x] `id`: primary key, auto-increments.
- [x] `name`: text, required.

#### students

- [x] `id`: primary key, auto-increments.
- [x] `name`: text, required.
- [x] `cohort_id`: references the `id` in the cohorts table.

Use knex seeding feature to add test data to your tables.

- [x] cohort test data
- [x] student test data

Implement the following endpoints:

- [x] `[POST] /api/cohorts` This route should save a new cohort to the database.
- [x] `[GET] /api/cohorts` This route will return an array of all cohorts.
- [x] `[GET] /api/cohorts/:id` This route will return the cohort with the matching `id`.
- [x] `[GET] /api/cohorts/:id/students` returns all students for the cohort with the specified `id`.
- [x] `[PUT] /api/cohorts/:id` This route will update the cohort with the matching `id` using information sent in the body of the request.
- [x] `[DELETE] /api/cohorts/:id` This route should delete the specified cohort.

## Stretch Problem

Add the following endpoints.

- [x] `[POST] /students` This route should save a new student to the database.
- [x] `[GET] /students` This route will return an array of all students.
- [x] `[GET] /students/:id` This route will return the student with the matching `id`.
- [x] `[PUT] /students/:id` This route will update the student with the matching `id` using information sent in the body of the request.
- [x] `[DELETE] /students/:id` This route should delete the specified student.

- [x] Have the student returned by the `[GET] /students/:id` endpoint include the cohort name and remove the `cohort_id` fields. The returned object should look like this:

```js
{
  id: 1,
  name: 'Lambda Student',
  cohort: 'Full Stack Web Infinity'
}
```

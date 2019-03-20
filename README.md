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

- `id`: primary key, auto-increments.
- `name`: text, required.

#### students

- `id`: primary key, auto-increments.
- `name`: text, required.
- `cohort_id`: references the `id` in the cohorts table.

Use knex seeding feature to add test data to your tables.

Implement the following endpoints:

V `[POST] /api/cohorts` This route should save a new cohort to the database.
V `[GET] /api/cohorts` This route will return an array of all cohorts.
V `[GET] /api/cohorts/:id` This route will return the cohort with the matching `id`.
V `[GET] /api/cohorts/:id/students` returns all students for the cohort with the specified `id`.
V `[PUT] /api/cohorts/:id` This route will update the cohort with the matching `id` using information sent in the body of the request.
V `[DELETE] /api/cohorts/:id` This route should delete the specified cohort.

## Stretch Problem

Add the following endpoints.

V `[POST] /students` This route should save a new student to the database.
V `[GET] /students/:id` This route will return the student with the matching `id`.
V `[PUT] /students/:id` This route will update the student with the matching `id` using information sent in the body of the request.
V `[DELETE] /students/:id` This route should delete the specified student.

Have the student returned by the `[GET] /students/:id` endpoint include the cohort name and remove the `cohort_id` fields. The returned object should look like this:

```js
{
  id: 1,
  name: 'Lambda Student',
  cohort: 'Full Stack Web Infinity'
}
```
Author: Kseniya Platonava
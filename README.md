# Sprint Challenge for RDBMS and SQL

The purpose of this exercise is to get you used to being quizzed on _interview questions_ commonly asked about Relational Database Management Systems and SQL.

Please work on this challenge alone, but feel free to use outside resources. You can _reference_ any old code you may have, however, please refrain from copying and pasting any of your answers. Try and understand the question and put your responses in your own words. Be as thorough as possible when explaining something.

## Assignment

**Start by forking and cloning this repository.**

Open the _Review.md_ file and answer the questions inside, then move on to working on the following project.

## Project description

The application lets users track `Projects` and `Actions` in the spirit of David Allen's _Getting Things Done (GTD)_ methodology.

You'll use _Node.js_, _Express.js_ and _Knex_ to build a RESTful API for a `Project Tracker` application that persists data to a _SQLite_ database.

## General Requirements

- A `project` can contain multiple actions and has:
  - a unique Id.
  - a name.
  - a description.
  - a flag that indicates if the project is complete or not.
- An `action` belongs to only one project. An action has:
  - a unique id.
  - a description of what needs to be done.
  - a notes column to add additional information.
  - a flag that indicates if the action has been completed.

Feel free to name the tables and fields anything you want. **Add relationships** as you see fit.

## tasks

- Build the database and tables using knex migrations. **Seeding is not needed**.
- Build the API to perform CRUD operations on projects and actions.
- Build an endpoint to retrieve a `project` by its `id` that returns an object
  with the following structure:

```js
{
  id: 1,
  name: 'project name here',
  desctiption: 'the project description',
  completed: false, // or true
  actions: [
    {
      id: 1,
      description: 'action description',
      notes: 'the action notes',
      completed: false // or true
    },
    {
      id: 7,
      description: 'another action description',
      notes: 'the action notes',
      completed: false // or true
    }
  ]
}
```

## Stretch Problem

This section is **optional** and not counted towards MVP. Start working on it after you're done with the main assignment.

Use `knext` to add _data seeding_ scripts for projects and actions.

Add support for the concept of `contexts`. A context is something like _at home_, _at work_ or _at computer_. The idea is that some actions require a certain `context` in order to be worked on. For example, the action of _file income taxes_ may require that you are _at home_, _at computer_ and _online_ so if you are _at work_ and look at the list of pending actions you could do in your current context, filing your taxes will not show be one of them.

A `context` can be applied to more than one `action`. An action can required more than one context, like in the example above.

When retrieving an `action` by _id_, add a property that lists all the `contexts` related to that action.

Remember to run `npm init -y` to generate a _package.json_ before adding your dependencies.

_Good luck and have fun!_

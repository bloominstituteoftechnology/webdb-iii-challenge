const express = require("express");

module.exports = (db, resource) => {
  const sendError = (status, errorMessage, res) => {
    res.status(status).json({ error: errorMessage });
  };
  const route = express.Router();
  route.get("/", async (req, res) => {
    try {
      const items = await db(resource);
      res.status(200).json(items);
    } catch (err) {
      sendError(500, `Server error. ${resource}s could not be found.`, res);
    }
  });

  route.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const item = await db(resource).where({ id });
      if (resource === "students") {
        const cohortID = item[0].cohort_id;
        itemJoin = await db
          .select(
              "students.id as student_id",
            "students.name as student_name",
            "students.cohort_id",
            "cohorts.name as cohort_name"
          )
          .from("students")
          .join("cohorts", { "cohorts.id": "students.cohort_id" }).where({'student_id':id});

        res.status(200).json(itemJoin);
        return;
      }

      if (item.length) {
        res.status(200).json(item);
        return;
      }
      throw err;
    } catch (err) {
      sendError(404, `no ${resource} found at that id.`, res);
    }
  });

  if (resource === "cohorts") {
    route.get("/:id/students", async (req, res) => {
      try {
        const { id } = req.params;
        const students = await db("students").where({ cohort_id: id });
        res.status(200).json(students);
      } catch (err) {
        sendError(404, `no ${resource} found at that id.`, res);
      }
    });
  }
  route.post("/", async (req, res) => {
    try {
      const body = req.body;
      if (resource === "cohorts") {
        if (!body.name) {
          sendError(400, `Name required`, res);
          return;
        }
      }
      if (resource === "students") {
        if (!body.cohort_id || !body.name) {
          sendError(400, `Student must have name and cohort_id`);
          return;
        }
      }
      const id = await db(resource).insert(body);
      const newItem = await db(resource).where({ id: id[0] });
      res.status(201).json(newItem);
    } catch (err) {
      sendError(500, `${resource} could not be added.`, res);
    }
  });

  route.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const count = await db(resource)
        .where({ id })
        .update(body);
      if (!count) {
        sendError(400, `${resource} was not altered`);
      }
      const updatedItem = await db(resource).where({ id });
      res.status(201).json({ updated: updatedItem });
    } catch (err) {
      sendError(500, `${resource} could not be altered.`, res);
    }
  });

  route.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const item = await db(resource).where({ id });
      if (!item) {
        sendError(400, `No ${resource} at that id.`, res);
        return;
      }
      const count = await db(resource)
        .where({ id })
        .del();
      if (count) {
        res.status(200).json({ deleted: item });
      }
    } catch (err) {
      sendError(500, `${resource} could not be removed.`, res);
    }
  });

  return route;
};

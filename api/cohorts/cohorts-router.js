const Chorots = require("./cohorts-model");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cohorts = await Chorots.find(req.query);
    res.status(200).json(cohorts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the cohorts"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cohort = await Chorots.findById(req.params.id);

    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: "Cohort not found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the cohort"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const cohort = await Chorots.add(req.body);
    res.status(201).json(cohort);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error adding the cohort"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Chorots.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The cohort has been nuked" });
    } else {
      res.status(404).json({ message: "The cohort could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error removing the cohort"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const cohort = await Chorots.update(req.params.id, req.body);
    if (cohort ) {
      res.status(200).json(cohort );
    } else {
      res.status(404).json({ message: "The cohort could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error updating the cohort"
    });
  }
});

// add an endpoint that returns all the messages for a hub

router.get("/:id/students", async (req, res) => {
  const { id } = req.params;

  try {
    const students = await Chorots.findCohortStudent(id);

    if (students.length) {
      res.json(students);
    } else {
      res.status(404).json({ err: "no students for this cohort" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});


// add an endpoint for adding new message to a hub
module.exports = router;

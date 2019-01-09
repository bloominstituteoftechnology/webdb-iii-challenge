const express = require("express");
const db = require("./cohortModel.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.find()
    .then(list => {
      res.status(200).json(list);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const cohort = await db.findById(id);

    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: "Cohort not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", (req, res) => {
  const cohort = req.body;

  // save data to the database
  db.add(cohort)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params

    db.remove(id)
        .then(count => {
            if (!count || count < 1) {
                res.status(404).json({message: 'No records found to delete'})
            } else {
                res.status(200).json(count)
            }
        }
        )
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;

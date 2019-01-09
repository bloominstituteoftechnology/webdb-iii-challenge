const express = require("express");
const db = require("./studentsModel.js");

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
// router.post("/", (req, res) => {
//   const students = req.body;

//   // save data to the database
// });

module.exports = router;

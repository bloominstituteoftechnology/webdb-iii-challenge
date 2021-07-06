const router = require('express').Router();

const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/lambda.sqlite3'
    }
}

const db = knex(knexConfig);


//check
router.get('/', (req, res) => {
    db('cohorts')
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(err => {
        res.status(500).json(err)
    })
}); 

//check
router.get('/:id', (req, res) => {
    db('cohorts')
    .where({ id: req.params.id })
    .first()
    .then(cohort => {
        if(cohort) {
            res.status(200).json(cohort)
        } else {
            res.status(404).json({ message: 'Cohort was not found!' })
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

//same function as the above get request

//check
// router.get('/:id', async (req, res) => {
//     try{
//         const cohort = await db('cohorts')
//         .where({ id:req.params.id })
//         .first()
//         res.status(200).json(cohort);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'There was an error retrieving cohort'})
//     }
// });


//Both requests below make same function

//check
// router.get('/:id/students', async (req, res) => {
//     try {
//       const cohort = await db('cohorts')
//         .join("students", "cohorts.id", "students.cohort_id")
//         .select("students.id", "students.name")
//         .where({ cohort_id: req.params.id })
//         .first()
//       res.status(200).json(cohort);
//     } catch (err) {
//       res.status(500).json(err);
//     }
// });


//check
router.get('/:id/students', (req, res) => {
    const id = req.params.id;
    db('cohorts')
      .join('students', 'students.cohort_id', 'cohorts.id')
      .select('students.id', 'students.name')
      .where('cohorts.id', id)
      .first()
      .then(stu => {
        if (stu) {
          res.status(200).json(stu);
        } else {
          res.status(404).json({ message: 'No students were found, please try again' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
});


/* 
//  students cohorts example
router.get('/api/students/:id', (req, res) => {
    const { id } = req.params;
     db('projects')
        .where({ id: id })
        .then(project => {
          db('cohorts).where({ studentId: id }).then(cohort=> {
                return res.status(200).json({ ...project, cohort: cohort });
          });
        })
        .catch(() => {
            return res
                .status(500)
                .json({ Error: "Student Info Error" })
        });
  });
*/



//check
router.post('/', async (req, res) => {
    try {
        const [id] = await db('cohorts').insert(req.body);
        const cohort = await db('cohorts')
        .where({ id })
        .first()
        res.status(201).json(cohort)
    } catch (error) {
        res.status(500).json({ error: 'There was an error posting that!' })
    }
});

//check
router.put('/:id', (req, res) => {
    db('cohorts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
        if (count > 0) {
        db('cohorts')
        .where({ id: req.params.id })
        .first()
        .then(cohort => {
            res.status(200).json(cohort)
        })
    } else {
        res.status(404).json({ message: 'Cohort information was not updated! '})
    }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

//check
router.delete('/:id', (req, res) => {
    db('cohorts')
    .where({ id: req.params.id })
    .del(req.body)
    .then(count => {
        if (count > 0) {
        db('cohorts')
        .where({ id: req.params.id })
        .first()
        .then(cohort => {
            res.status(200).json(cohort)
        })
    } else {
        res.status(404).json({ message: 'Cohort was not found! '})
    }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});


module.exports = router;
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
// router.get('/', (req, res) => {
//     res.send('Cohorts: Hello World!')
// });

//check
router.get('/', (req, res) => {
    db('cohorts')
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(error => {
        res.status(500).json(error)
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
    .catch(error => {
        res.status(500).json(error)
    })
});

//check
router.get('/:id/students', async (req, res) => {
    try{
        const students = await db('cohorts')
        .where({ id:req.params.id })
        .first()
        res.status(200).json(students);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'There was an error retrieving student'})
    }
});

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
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
//     res.send('Students: Hello World!')
// });

//check
router.get('/', (req, res) => {
    db('students')
    .then(students => {
        res.status(200).json(students)
    })
    .catch(error => {
        res.status(500).json(error)
    })
}); 

//check
router.get('/:id', (req, res) => {
    db('students')
    .where({ id: req.params.id })
    .first()
    .then(student=> {
        if(student) {
            res.status(200).json(student)
        } else {
            res.status(404).json({ message: 'Student was not found!' })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

//check
router.post('/', async (req, res) => {
    try {
        const [id] = await db('students').insert(req.body);
        const student = await db('students')
        .where({ id })
        .first()
        res.status(201).json(student)
    } catch (error) {
        res.status(500).json({ error: 'There was an error posting that!' })
    }
});

//check
router.put('/:id', (req, res) => {
    db('students')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
        if (count > 0) {
        db('students')
        .where({ id: req.params.id })
        .first()
        .then(student => {
            res.status(200).json(student)
        })
    } else {
        res.status(404).json({ message: 'Student information was not updated! '})
    }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

//check
router.delete('/:id', (req, res) => {
    db('students')
    .where({ id: req.params.id })
    .del(req.body)
    .then(count => {
        if (count > 0) {
        db('students')
        .where({ id: req.params.id })
        .first()
        .then(student => {
            res.status(200).json(student)
        })
    } else {
        res.status(404).json({ message: 'Student was not found! '})
    }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});


module.exports = router;
const knex = require ('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);
const cohortsTable ='cohorts';
const studentsTable = 'students';



const getAllItems = (tableName,req, res) =>{
        db.select().table(`${tableName}`)
        .then(item =>{
          res.status(200).json(item)
        })
        .catch(err =>{
          res.status(500).json(err)
        })
}

const getAllCohorts = getAllItems(cohortsTable, req, res);
const getAllStudents = getAllItems(studentsTable, req, res);


const getAsingleItem = (tableName, req, res) =>{
        const {id} = req.params;
        db(`${tableName}`).where('id', id)
        .then(item =>{
          res.status(200).json(item)
        })
        .catch(err =>{
          res.status(500).json(err)
        })
}

const getaCohort = getAsingleItem(cohortsTable, req, res);
const getaStudent = getAsingleItem(studentsTable, req, res);


const CreateNewItem = (tableName, req, res) =>{
  // GRAB DATA FROM THE BODY
  const newItem = req.body;
  // SAVE DATA TO DATABASE
  db(`${tableName}`).insert(newItem)
  // RETURN ID OF NEWLY CREATED RECORD
  .then(id =>{
    res.status(201).json({message :` inserted with ID :${id}`})
  })
  .catch(err =>{
    res.status(500).json(err)
  })  
}

const CreateNewCohort = CreateNewItem(cohortsTable, req, res);
const CreateNewStudent = CreateNewItem(studentsTable, req, res);



const UpdateItem = (tableName, req, res) =>{
    const {id} = req.params;
    const newItem = req.body;
    db(`${tableName}`).where({id})
    .update(newItem)
    .then(ids =>{
      res.status(200).json(ids)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
}

const UpdateCohort = UpdateItem(cohortsTable, req, res);
const UpdateStudent = UpdateItem(studentsTable, req, res);


const DestroyItem = (tableName, req, res) =>{
    const {id} = req.params;
    db(`${tableName}`).where({id})
    .del()
    .then(ids =>{
      res.status(200).json(ids)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
}
const DestroyCohort = DestroyItem(cohortsTable, req, res);
const DestroyStudent = DestroyItem(studentsTable, req, res);



module.exports = {
    DestroyCohort       : DestroyCohort,
    DestroyStudent      : DestroyStudent,
    UpdateCohort        : UpdateCohort,
    UpdateStudent       : UpdateStudent,
    CreateNewCohort     : CreateNewCohort,
    CreateNewStudent    : CreateNewStudent,
    getaCohort          : getaCohort,
    getaStudent         : getaStudent,
    getAllCohorts       : getAllCohorts,
    getAllStudents      : getAllStudents
}
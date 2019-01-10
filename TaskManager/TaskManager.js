const knex = require ('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);
const cohortsTable ='cohorts';
const studentsTable = 'students';



const getAllItems = (tableName) =>{
    return (req, res)=>{
        db.select().table(`${tableName}`)
        .then(item =>{
          res.status(200).json(item)
        })
        .catch(err =>{
          res.status(500).json(err)
        })
    }
       
}

const getAllCohorts = getAllItems(cohortsTable);
const getAllStudents = getAllItems(studentsTable);


const getAsingleItem = (tableName, req, res) =>{
    return (req, res)=>{
        const {id} = req.params;
        db(`${tableName}`).where('id', id)
        .then(item =>{
          res.status(200).json(item)
        })
        .catch(err =>{
          res.status(500).json(err)
        })
    }
    
}

const getaCohort = getAsingleItem(cohortsTable);
const getaStudent = getAsingleItem(studentsTable);


const CreateNewItem = (tableName, req, res) =>{
  // GRAB DATA FROM THE BODY
  return (req, res)=>{
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
   
}

const CreateNewCohort = CreateNewItem(cohortsTable);
const CreateNewStudent = CreateNewItem(studentsTable);



const UpdateItem = (tableName) =>{
    return (req, res)=>{
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
   
}

const UpdateCohort = UpdateItem(cohortsTable);
const UpdateStudent = UpdateItem(studentsTable);


const DestroyItem = (tableName, req, res) =>{
    return (req, res)=>{
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
   
}
const DestroyCohort = DestroyItem(cohortsTable);
const DestroyStudent = DestroyItem(studentsTable);



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
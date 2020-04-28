

//== Project Constants =========================================================

const PORT = 3300; // To Do: Get this from the command line
module.exports = {
    // Server Configuration
    PORT: PORT,
    MESSAGE_SERVER_START: `\nServer started on port ${PORT}\n`,
    // Route Paths
    PATH_COHORTS : '/api/cohorts' ,
    PATH_STUDENTS: '/api/students',
    // Database Strings
    TABLE_COHORTS : 'cohorts' ,
    TABLE_STUDENTS: 'students',
    FIELD_ID       : 'id'       ,
    FIELD_NAME     : 'name'     ,
    FIELD_COHORT   : 'cohort'   ,
    FIELD_COHORT_ID: 'cohort_id',
};

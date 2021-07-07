const router = require('express').Router();

router.use('/cohorts', require('./cohorts'));
router.use('/students', require('./students'));

module.exports = router;

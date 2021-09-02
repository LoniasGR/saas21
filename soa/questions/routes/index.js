const router = require('express').Router();

router.use('/api/questions/', require('./questions'));

module.exports = router;

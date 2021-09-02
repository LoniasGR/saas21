const router = require('express').Router();

router.use('/api/keywords/', require('./keywords'));

module.exports = router;

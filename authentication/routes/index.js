const router = require('express').Router();

router.use('/api/auth/', require('./users'));

module.exports = router;

const router = require('express').Router();

router.use('/api/answers/', require('./answers'));

module.exports = router;

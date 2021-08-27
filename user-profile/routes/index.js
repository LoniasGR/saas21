const router = require('express').Router();

router.use('/api/users/', require('./users'));

router.use('/api/profile/', require('./profile'));

module.exports = router;

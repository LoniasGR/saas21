const router = require('express').Router();

router.use('/api/profile/', require('./profiles'));

module.exports = router;

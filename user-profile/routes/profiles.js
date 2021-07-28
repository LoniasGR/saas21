const router = require('express').Router();

const utils = require('../lib/utils');

/* GET users listing. */
router.get('/:userName', utils.authMiddleware, (req, res, next) => {
  const profile = req.params.userName;
  const username = req.jwt.sub;

  if (profile === username) {
    // TODO
    res.status(200).json({ success: true });
  } else {
    // If the user is looking at a different profile,
    // then give them less info or an error.
    res.status(200).json({ success: true });
  }
});

module.exports = router;

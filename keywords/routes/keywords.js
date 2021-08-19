const router = require('express').Router();

const { buildKeyword, keywordAlreadyExists } = require('../controllers/KeywordController');
const { publishKeyword } = require('../controllers/KeywordPublisher');
const utils = require('../lib/utils');
const { Keyword } = require('../models/Keyword');

router.get('/', (req, res, next) => {
  Keyword.findAll()
    .then((keywords) => {
      const retKeywords = keywords.map((keyword) => {
        const keywordData = {
          id: keyword.id,
          name: keyword.name,
          description: keyword.description,
        };
        return keywordData;
      });
      res.status(200).json({
        success: true,
        keywords: retKeywords,
      });
    })
    .catch((err) => console.error(err));
});

router.get('/:keywordId', (req, res, next) => {
  Keyword.findOne({ where: { id: req.params.keywordId } })
    .then((keyword) => {
      if (!keyword) {
        res.status(404).json({ success: false, msg: 'Keyword not found' });
      }
      const retData = {
        id: keyword.id,
        name: keyword.name,
        description: keyword.description,
      };
      res.status(200).json({ success: true, keyword: retData });
    })
    .catch((err) => console.error(err));
});

router.post('/new', utils.authMiddleware, (req, res, next) => {
  keywordAlreadyExists(req.body.name).then((duplicate) => {
    if (duplicate) {
      res.status(401).json({
        success: false, msg: `${req.body.name} already exists`,
      });
    } else {
      const newKeyword = buildKeyword(req.body);
      newKeyword.save()
        .then((keyword) => {
          publishKeyword(keyword);
          res.json({
            success: true,
            name: keyword.name,
          });
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    }
  });
});

module.exports = router;

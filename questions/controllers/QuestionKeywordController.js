const { QuestionKeyword } = require('../models/QuestionKeyword');

function buildQuestionKeyword(questionId, keywordId) {
  const newQuestionKeyword = QuestionKeyword.build(
    {
      keywordId,
      QuestionId: questionId,
    },
  );
  return newQuestionKeyword;
}

function addQuestionKeywords(questionId, keywordIds) {
  keywordIds.map((keyword) => {
    const newQuestionKeyword = buildQuestionKeyword(questionId, keyword);
    newQuestionKeyword.save()
      .catch((err) => { console.error(err); });
    return 0;
  });
}

module.exports.addQuestionKeywords = addQuestionKeywords;
module.exports.buildQuestionKeyword = buildQuestionKeyword;

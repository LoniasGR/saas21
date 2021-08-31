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
    return newQuestionKeyword.save()
      .catch((err) => { console.error(err); });
  });
}

module.exports.addQuestionKeywords = addQuestionKeywords;
module.exports.buildQuestionKeyword = buildQuestionKeyword;

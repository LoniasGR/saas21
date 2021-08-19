function getKeywords(keywordsString) {
  const keywordsNames = keywordsString.split(', ');
  const keywords = keywordsNames.map(async (keywordName) => {
    if (utils.isAlnum(keywordName)) {
      const newKeyword = Keyword.findOne({ where: { name: keywordName } })
        .then((keyword) => {
          if (!keyword) {
            return null;
          }
          return keyword.name;
        })
        .catch((err) => {
          console.error(err);
          return null;
        });
      return newKeyword;
    }

    return null;
  });
  return Promise.all(keywords);
}

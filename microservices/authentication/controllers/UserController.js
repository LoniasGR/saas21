const { User } = require('../models/User');

function buildUser(data, hash, salt) {
  const newUser = User.build(
    {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      hash,
      salt,
    },
  );
  return newUser;
}

module.exports.buildUser = buildUser;

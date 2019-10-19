const bcrypt = require('bcrypt');
const { config } = require('dotenv');

config();

module.exports = async (password) => {
  const salt = await bcrypt.genSalt(+process.env.SALT);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

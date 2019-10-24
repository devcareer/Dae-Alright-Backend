const { config } = require('dotenv');
const jwt = require('jsonwebtoken');

config();

export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '24h' });
  return token;
};

export default { generateToken };

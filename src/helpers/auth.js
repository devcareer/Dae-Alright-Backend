/* eslint-disable import/prefer-default-export */
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();

export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '24h' });
  return `Bearer ${token}`;
};

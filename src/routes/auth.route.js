import { Router } from 'express';
import authentication from '../middleware/auth';
import authSchemas from '../validations/auth.validator';
import { createUser } from '../controllers/auth.controller';
import validator from '../middleware/validator';

const { signupSchema } = authSchemas;
const { checkExistingUser } = authentication;

const authRoute = Router();

authRoute.post(
  '/signup',
  validator(signupSchema),
  checkExistingUser,
  createUser
);

export default authRoute;

import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import authentication from '../middleware/auth';
import authSchemas from '../validations/auth';
import validator from '../middleware/validator';
import signin from '../controllers/auth.controller';

const { checkExistingUser } = authentication;
const { signupSchema, signinSchema} = authSchemas;

const authRoute = Router();

authRoute.post(
  '/signup',
  validator(signupSchema),
  checkExistingUser,
  AuthController.createUser
);

authRoute.post(
  '/signin', 
  validator(signinSchema), 
  signin)

export default authRoute;

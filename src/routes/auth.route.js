import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import authentication from '../middleware/auth';
import authSchemas from '../validations/auth';
import validator from '../middleware/validator';

const { checkExistingUser } = authentication;
const { signupSchema } = authSchemas;

const authRoute = Router();

authRoute.post(
  '/signup',
  validator(signupSchema),
  checkExistingUser,
  AuthController.createUser
);

export default authRoute;

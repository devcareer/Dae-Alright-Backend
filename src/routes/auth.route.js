import { Router } from 'express';
import authentication from '../middleware/auth';
import authSchemas from '../validations/auth.validator';
import { createClient, signIn } from '../controllers/auth.controller';
import { forgotPassword, resetPassword } from '../controllers/password.controller';
import validator from '../middleware/validator';

const { checkExistingClient } = authentication;
const { 
  userSignupSchema, vendorSignupSchema,
  signinSchema, emailSchema, passwordSchema,
} = authSchemas;

const authRoute = Router();

authRoute.post(
  '/user/signup',
  validator(userSignupSchema),
  checkExistingClient,
  createClient
);

authRoute.post(
  '/user/signin',
  validator(signinSchema),
  signIn
);

authRoute.post(
  '/user/forgot',
  validator(emailSchema),
  forgotPassword
);

authRoute.post(
  '/user/reset/:token',
  validator(passwordSchema),
  resetPassword
);

authRoute.post(
  '/vendor/signup',
  validator(vendorSignupSchema),
  checkExistingClient,
  createClient
);

authRoute.post(
  '/vendor/signin',
  validator(signinSchema),
  signIn
);

export default authRoute;

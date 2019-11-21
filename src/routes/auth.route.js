import { Router } from 'express';
import authentication from '../middleware/auth';
import authSchemas from '../validations/auth.validator';
import { createClient, signin } from '../controllers/auth.controller';
import validator from '../middleware/validator';


const { checkExistingClient } = authentication;
const { userSignupSchema, vendorSignupSchema, signinSchema } = authSchemas;

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
  signin
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
  signin
);

export default authRoute;

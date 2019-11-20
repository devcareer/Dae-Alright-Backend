import { Router } from 'express';
import authentication from '../middleware/auth';
import vendorAuthentication from '../middleware/auth.vendor';
import authSchemas from '../validations/auth.validator';
import vendorAuthSchemas from '../validations/vendor.auth.validator';
import { createUser, signin } from '../controllers/auth.controller';
import { createVendor, vendorSignin } from '../controllers/vendor.auth.controller';
import validator from '../middleware/validator';


const { checkExistingUser } = authentication;
const { checkExistingVendor } = vendorAuthentication;
const { signupSchema, signinSchema } = authSchemas;
const { vendorSignupSchema, vendorSigninSchema } = vendorAuthSchemas;

const authRoute = Router();

authRoute.post(
  '/user/signup',
  validator(signupSchema),
  checkExistingUser,
  createUser
);

authRoute.post(
  '/user/signin',
  validator(signinSchema),
  signin
);

authRoute.post(
  '/vendor/signup',
  validator(vendorSignupSchema),
  checkExistingVendor,
  createVendor
);

authRoute.post(
  '/vendor/signin',
  validator(vendorSigninSchema),
  vendorSignin
);

export default authRoute;

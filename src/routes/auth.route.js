import { Router } from 'express';
import authentication from '../middleware/auth';
import authSchemas from '../validations/auth.validator';
import { createUser, signin } from '../controllers/auth.controller';
import validator from '../middleware/validator';
import { secretRoute } from '../controllers/auth.controller';
import passport from '../config/passport-config/config';


const { checkExistingUser } = authentication;
const { signupSchema, signinSchema } = authSchemas;

const authRoute = Router();

authRoute.post(
  '/signup',
  validator(signupSchema),
  checkExistingUser,
  createUser
);

authRoute.get('/secret', passport.authenticate('jwt', { session: false }), secretRoute);

authRoute.post(
  '/signin',
  validator(signinSchema),
  signin
);

export default authRoute;

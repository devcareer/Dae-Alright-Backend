import { Router } from 'express';
import authentication from '../middleware/auth';
import authSchemas from '../validations/auth.validator';
import { createUser } from '../controllers/auth.controller';
import validator from '../middleware/validator';
import { secretRoute } from '../controllers/auth.controller';
import passport from '../config/passport-config/config';

const { signupSchema } = authSchemas;
const { checkExistingUser } = authentication;

const authRoute = Router();

authRoute.post(
  '/signup',
  validator(signupSchema),
  checkExistingUser,
  createUser
);

authRoute.get('/secret', passport.authenticate('jwt', { session: false }), secretRoute);

export default authRoute;

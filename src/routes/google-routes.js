import { Router } from 'express';
import passportGoogle from '../config/passport-config/google-passport-config';
import { socialOAuth } from '../controllers/auth.controller';

const router = Router();

router.get(
  '/',
  passportGoogle.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  }),
);

// callback route for google
router.get(
  '/redirect',
  passportGoogle.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
    failureRedirect: '/signup',
  }),
  socialOAuth,
);

export default router;

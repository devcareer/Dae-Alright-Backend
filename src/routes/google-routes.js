/* eslint-disable linebreak-style */
import passportGoogle from '../config/passport-config/google-passport-config';
import { Router } from 'express';
import { googleOAuth, secretRoute } from '../controllers/auth.controller';
import passport from '../config/passport-config/google-passport-config';

const router = Router();

router.get(
  '/',
  passportGoogle.authenticate('google', { session: false,
    scope: ['profile', 'email'], 
  }) 

);

// callback route for google
router.get(
  '/redirect',
  passportGoogle.authenticate('google', { session: false,
    failureRedirect: '/',
  }), googleOAuth
);

router.get('/secret', passport.authenticate('jwt', { session: false }), secretRoute);

export default router;

/* eslint-disable linebreak-style */
import passportGoogle from '../config/passport-config/google-passport-config';
import { Router } from 'express';
import { socialOAuth } from '../controllers/auth.controller';
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
    failureRedirect: '/signup',
  }), socialOAuth
);

export default router;

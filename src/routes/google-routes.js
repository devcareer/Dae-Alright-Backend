import { Router } from 'express';
import passportGoogle from '../config/passport-config/google-passport-config';
import { socialOAuth, findRole } from '../controllers/auth.controller';

const router = Router();

router.get(
  '/user', findRole,
  passportGoogle.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  })
);

router.get(
  '/vendor', findRole,
  passportGoogle.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  })
);

// callback route for google
router.get(
  '/redirect',
  passportGoogle.authenticate('google', {
    session: false,
    failureRedirect: '/signup',
  }), socialOAuth
);

export default router;

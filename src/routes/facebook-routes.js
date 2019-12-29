import { Router } from 'express';
import passportFacebook from '../config/passport-config/facebook-passport-config';
import { socialOAuth } from '../controllers/auth.controller';

const router = Router();

// authenticate with facebook
router.get(
  '/',
  passportFacebook.authenticate('facebook', {
    session: false,
    scope: ['email']
  })
);

// callback route for facebook
router.get(
  '/callback',
  passportFacebook.authenticate('facebook', {
    session: false
  }),
  socialOAuth
);

export default router;

/* eslint-disable linebreak-style */
import passportFacebook from '../config/passport-config/facebook-passport-config';
import { googleOAuth } from '../controllers/auth.controller'
import { Router } from 'express';

import { generateToken } from '../helpers/auth';

const router = Router();

const generateUserToken = (req, res) => {
  const user =req.user.dataValues;
  const token = 'JWT ' + generateToken(user);
   res.send(token);
}

// mauthenticate with facebook
router.get('/', passportFacebook.authenticate('facebook', { session: false, scope : ['email'] }));

// callback route for facebook
router.get(
  '/redirect',
  passportFacebook.authenticate('facebook', { session: false
    // successRedirect: '/',
    // failureRedirect: '/signup',
  }), generateUserToken
);

export default router;

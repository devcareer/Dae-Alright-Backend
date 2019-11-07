/* eslint-disable linebreak-style */
import passportGoogle from '../../../../src/config/google-passport-config';
import { Router } from 'express';
import { generateToken } from '../../../../src/helpers/auth';

const router = Router();

const generateUserToken = (req, res) => {
  const user =req.user.dataValues;
  const token = 'JWT ' + generateToken(user);
   res.send(token);
}
// authenticate with google
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
    // successRedirect: '/',
    // failureRedirect: '/signup',
  }), generateUserToken
);

export default router;

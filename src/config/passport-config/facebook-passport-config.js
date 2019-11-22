import { config } from 'dotenv';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import database from '../../database/models';
import { account } from '../../controllers/auth.controller';
import { findBySocialID } from './config';

const { User, Vendor } = database;

config();

passport.use(new FacebookStrategy.Strategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.URL}/auth/facebook/redirect`,
    profileFields: ['id', 'emails', 'name'],
  },
  (accessToken, refreshToken, profile, done) => {
    try {
      const table = account === 'user' ? User : Vendor;
      findBySocialID(profile.id, 'facebook', table).then(async currentUser => {
        if (currentUser) {
          return done(null, currentUser);
        }
        const profileObj = profile._json;
        const user = {
          socialID: profile.id,
          provider: 'facebook',
          firstName: profileObj.first_name,
          lastName: profileObj.last_name,
          email: profileObj.email || '',
          phone: '',
          address: '',
        };

        if (account === 'user') {
          await User.create(user);
        } else if (account === 'vendor') {
          user.name = `${user.firstName} ${user.lastName}`;
          delete user.firstName;
          delete user.lastName;
          await Vendor.create(user);
        }
        return done(null, user);
      });
    } catch (err) {
      return done(err, false);
    }
  },
),);

export default passport;

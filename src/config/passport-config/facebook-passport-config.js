import { config } from 'dotenv';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import database from '../../database/models';
import { findBySocialID } from './config';

const { User } = database;

config();

passport.use(
  new FacebookStrategy.Strategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/redirect/',
      profileFields: ['id', 'emails', 'name'],
    },
    (accessToken, refreshToken, profile, done) => {
      try {
        findBySocialID(profile.id, 'facebook').then(async currentUser => {
          if (currentUser) {
            return done(null, currentUser);
          }
          const user = {
            socialID: profile.id,
            provider: 'facebook',
            firstName: profile.json.first_name,
            lastName: profile.json.last_name,
            email: profile.json.email || null,
            phone: '',
            address: '',
          };

          await User.create(user);
          return done(null, user);
        });
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

export default passport;

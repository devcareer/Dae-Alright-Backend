import { config } from 'dotenv';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import database from '../../database/models';
import { account } from '../../controllers/auth.controller';
import { findBySocialID } from './config';

const { User } = database;
const { Vendor } = database;
config();

passport.use(new GoogleStrategy(
  {
    // options
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.URL}/auth/google/redirect`,
  },
  (accessToken, refreshToken, profile, done) => {
    try {
      const table = account === 'user' ? User : Vendor;
      findBySocialID(profile.id, 'google', table).then(async currentUser => {
        if (currentUser) {
          return done(null, currentUser);
        }
        const user = {
          socialID: profile.id,
          provider: 'google',
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
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
      done(err, false);
    }
  },
),);

export default passport;

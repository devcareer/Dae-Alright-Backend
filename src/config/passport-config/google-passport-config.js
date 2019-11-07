import dotenv from 'dotenv';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { User } from '../database/models';

import { findBySocialID } from './config';
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      // options
      callbackURL: '/auth/google/redirect',
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      findBySocialID(profile.id, 'google')
        .then(async currentUser => {
          if(currentUser){
            console.log('user exists');
            return done(null, currentUser);
          }else {
            const user = {
              socialID: profile.id,
              provider: 'google',
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: profile.emails[0].value,
              phone: '',
              address: ''
            }
            await User.create(user);
            return done(null, user);
          }
        })
    }
  )
);

export default passport;

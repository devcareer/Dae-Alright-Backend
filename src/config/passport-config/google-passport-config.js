import { config } from 'dotenv';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import database from '../../database/models';

const { User } = database;

import { findBySocialID } from './config';
config();

passport.use(
  new GoogleStrategy(
    {
      // options
      callbackURL: '/auth/google/redirect',
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      try{
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
      catch(err){
        done(err, false)
      }
    }
  )
);

export default passport;

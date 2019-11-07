import dotenv from 'dotenv';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import { User } from '../database/models';
import { findBySocialID } from './config';

dotenv.config();

passport.use(
  new FacebookStrategy.Strategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/redirect/',
      profileFields: ['id', 'emails', 'name']
    },
    (accessToken, refreshToken, profile, done) => {
      findBySocialID(profile.id, 'facebook')
        .then(async currentUser => {
          if(currentUser){
            console.log('user exists');
            return done(null, currentUser);
          }else {
            const user = {
              socialID: profile.id,
              provider: 'facebook',
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

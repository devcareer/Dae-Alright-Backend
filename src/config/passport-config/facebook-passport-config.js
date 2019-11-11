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
      profileFields: ['id', 'emails', 'name']
    },
    (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        findBySocialID(profile.id, 'facebook')
        .then(async currentUser => {
          if(currentUser){
            console.log('user exists');
            return done(null, currentUser);
          }else {
            const user = {
              socialID: profile.id,
              provider: 'facebook',
              firstName: profile._json.first_name,
              lastName: profile._json.last_name,
              email: profile._json.email || null,
              phone: '',
              address: ''
            }
            
            await User.create(user);
            return done(null, user);
          }
        })

      }catch(err){
        return done(err, false);
      }
    }
  )
);

export default passport;

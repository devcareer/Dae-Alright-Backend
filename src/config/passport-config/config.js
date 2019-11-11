import passport from 'passport';
import database from '../../database/models';
import { ExtractJwt, Strategy } from 'passport-jwt';

const { User } = database;

export const findBySocialID = async (socialID, provider) => await User.findOne({where: {socialID, provider }})

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY,
}

passport.use(new Strategy(options, (jwt_payload, done) => {
    User.findOne({ where: {socialID: jwt_payload.socialID, provider: jwt_payload.provider}}
    ).then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(err => {
        if (err) { return done(err, false); }
      });
}))

export default passport;

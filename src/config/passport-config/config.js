import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import database from '../../database/models';

const { User } = database;

export const findBySocialID = async (socialID, provider, table) => table.findOne({
  where: { socialID, provider },
});

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
};

passport.use(new Strategy(options, (jwtPayload, done) => {
  User.findOne({ where: { socialID: jwtPayload.socialID, provider: jwtPayload.provider } })
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      if (err) {
        return done(err, false);
      }
    });
}),);

export default passport;

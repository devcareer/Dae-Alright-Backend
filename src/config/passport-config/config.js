import passport from 'passport';
import { User } from '../database/models';
import { ExtractJwt, Strategy } from 'passport-jwt';

export const findBySocialID = async (socialID, provider) => await User.findOne({where: {socialID, provider }})

const options = {
    // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.JWT_KEY,
    issuer: 'dae-alright',
    audience: 'dae-alright-public'
}

passport.use(new Strategy(options, (jwt_payload, done) => {
    console.log(jwt_payload, 'bb');
    User.findOne({ where: {id: jwt_payload._id}}, (err, user) => {
        if(err) {
            console.log('a')
            return done(err, false);
        }
        if(user){
            console.log('b')
            return done(null, user, payload);
        }
        console.log('c')
        return done();
    })
}))

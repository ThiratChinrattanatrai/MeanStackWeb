const JwtStrategy = require('passport-jwt').Strategy;
const JwtExtract = require('passport-jwt').ExtractJwt;
const config = require('../config/database');
const User = require('../mongoDB/controller/user.controller');
module.exports = function(passport){
    let options = {};
    options.jwtFromRequest = JwtExtract.fromAuthHeaderAsBearerToken();
    options.secretOrKey = config.secret;
    passport.use(new JwtStrategy(options, (jwt_payload,done) => {
        User.getUserByID(jwt_payload.data._id,(err,user) => {
            if(err){
                return done(err,false);
            }

            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        })
    }))
}

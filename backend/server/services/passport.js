const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
var localOptions = {
	usernameField: 'username',
	passReqToCallback: true
}
const localLogin = new LocalStrategy(localOptions, function(req, email, password, done) {
	// verify this email and password, call done with the user
	// if it is the correct email and password
	// otherwise call done with false
	User.findOne({ $or: [{username: req.body.username || ''}, {email: req.body.username || ''}]}, function(err, user) {
		if(err) { return done({error: err}); }
		if(!user) { return done(null, false); }

		// compare password - is 'password' equal to user's password?
		user.comparePassword(password, function(err, isMatch) {
			if(err) { return done(err); }
			if(!isMatch) { return done(null, false); }

			return done(null, user);
		});
	});
});

// set up options for JWT strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secrets.jwt
};
// create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// see if the user id on payload exists in database
	// if it does call done with that object
	// otherwise, call done without user object
	User.findById(payload.sub, function(err, user) {
		if(err) { return done(err, false); }

		if(user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
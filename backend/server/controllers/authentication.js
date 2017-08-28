const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');
const _ = require('lodash');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secrets.jwt);
}

exports.register = function(req, res, next) {
	// See if a user with given email exists
	User.findOne({ $or: [{username: req.body.username}, {email: req.body.email}]}, function(err, existingUser) {
		if(err) { return next(err); }

		// If a user exists return an error
		if(existingUser) {
			return res.status(422).send({ error: 'Email or username is already in use' });
		}	

		// If a user with email does not exsit create and save record
		const user = new User(req.body);

		user.save(function(err) {
			if(err) { return next(err); }

			// Respond to request indicating the user was created
			res.json({ token: tokenForUser(user), user: _.pick(user.toObject(), ['_id', 'email', 'username', 'first_name', 'last_name', 'verified', 'favorite_ids']) });
		});
	});
}

exports.login = function(req, res, next) {
	// user has arleady had their email and password auth'd 
	// we need to give them a token
	res.send({ token: tokenForUser(req.user), user: _.pick(req.user.toObject(), ['_id', 'email', 'username', 'first_name', 'last_name', 'verified', 'favorite_ids']) })
}
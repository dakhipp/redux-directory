const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model 
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true, required: true },
	username: { type: String, unique: true, lowercase: true, required: true },
	password: { type: String, required: true },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	verified: { type: Boolean, default: false, required: true },
	favorite_ids: { type: Array, default: [] },
	__v: { select: false }
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

// on save hook, encrpt password
userSchema.pre('save', function(next) {
	// get access to user model
	const user = this;

	// generate a salt, then run call back
	bcrypt.genSalt(10, function(err, salt) {
		if(err) { return next(err); }

		// hash (encrypt) or password
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if(err) { return next(err); }

			// save encrpted password instead of password
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) { return callback(err); }	

		callback(null, isMatch);
	});
}

// create the model class 
const ModelClass = mongoose.model('user', userSchema);

// export the model 
module.exports = ModelClass;
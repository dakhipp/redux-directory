const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const baiduMap = require('baidumap');
const bdmap = baiduMap.create({'ak':'ktkStFjoEM5f1hHWEA3RB1PFmURrw3m6'});
const _ = require('lodash');

// Define our model 
const dentistSchema = new Schema({
	dr_name: { type: String, required: true },
	office_name: { type: String, required: true },
	address: { type: String, required: true },
	phone: { type: String, required: true },
	email: { type: String, required: true },
	featured: { type: Boolean, default: false },
	about: { type: String, required: true },
	lat: Number,
	lng: Number,
	main_image: String,
	images: [String],
	varified: { type: Boolean, default: false },
	hours: {
		monday: String,
		tuesday: String,
		wednesday: String,
		thursday: String,
		friday: String,
		saturday: String,
		sunday: String
	},
	services: [String],
	__v: {select: false}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

// on save hook, get lat lng for address
dentistSchema.pre('save', function(next) {
	// get access to user model
	const dentist = this;

	var options = {'query': dentist.address, 'region': 'China'};

	bdmap.suggestion(options, function(err, res) {
		if(err) { return next(err); }

		var results = JSON.parse(res).result;

		if(results.length > 0) {
			var firstWithLatLng = _.find(results, 'location');

			dentist.lat = firstWithLatLng.location.lat;
			dentist.lng = firstWithLatLng.location.lng;
			next();
		} else {
			dentist.lat = 0;
			dentist.lng = 0;
			next();
		}
	});
});

// create the model class 
const ModelClass = mongoose.model('dentist', dentistSchema);

// export the model 
module.exports = ModelClass;
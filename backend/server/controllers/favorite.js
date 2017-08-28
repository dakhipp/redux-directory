const jwt = require('jwt-simple');
const config = require('../config');
const _ = require('lodash');
const GeoPoint = require('geopoint');
const User = require('../models/user');
const Dentist = require('../models/dentist');


exports.postFavorite = function(req, res, next) {
	if(req.body.fav_id) {
		const identity = jwt.decode(req.headers.authorization, config.secrets.jwt).sub;
		const query = {"_id": identity }
		
		// possibly refactor later to only have one db op
		User.findOne(query, function(err, user) {
			if(err) { return next(err); }

			if(user) {
				if(_.indexOf(user.favorite_ids, req.body.fav_id) > -1) {
					User.findOneAndUpdate(query, { $pull : { "favorite_ids": req.body.fav_id } }, function(err, user) {
						if(err) { return next(err); }
						user.favorite_ids.pull(req.body.fav_id);
						res.send(user);
					});
				} else {
					User.findOneAndUpdate(query, { $push : { "favorite_ids": req.body.fav_id } }, function(err, user) {
						if(err) { return next(err); }
						user.favorite_ids.push(req.body.fav_id);
						res.send(user);
					});
				}
			}
		});
	} else {
		res.send({'error': 'The provided dentist id does not exist.'});
	}
}

exports.getFavorite = function(req, res, next) {
	const identity = jwt.decode(req.headers.authorization, config.secrets.jwt).sub;
	User.findById(identity, function(err, user) {
		if(err) { return next(err); }
		if(user && user.favorite_ids.length > 0) {
			const query = createFavIdsQuery(user.favorite_ids, req.query);
			const conditions = getSearchConditions(req.query.page);
			Dentist
			.find(query)
			.skip(conditions.page*conditions.limit)
			.limit(conditions.limit)
			.exec(function(err, dentists) {
				if(err) { return next(err); }
				res.send(dentists);
			});
		}
	});
}

// get basic db search conditions used with req.query.page to implement pagination
function getSearchConditions(page) {
	return {
		page: page || 0,
		limit: 10
	}
}

// takes in an array of dentist ids builds query to database that will return dentists from the ids
function createFavIdsQuery(dentistIdsArray, queryParams) {
	var query = {
		_id: {
			$in: [
			]
		}
	}
	var query2 = {};

	dentistIdsArray.map(function(id) {
		query._id.$in.push(id);
	});

	if(queryParams.lat && queryParams.lng && queryParams.office_name) {
		_.merge(query2, buildLatLngQuery(parseFloat(queryParams.lat), parseFloat(queryParams.lng)));
		query.office_name = {
			"$regex": queryParams.office_name, "$options": "i"
		}
	}

	if(_.size(query2) > 0) {
		return _.merge(query, query2);
	} else {
		return query;
	}
}

// get basic lat/lng db query object
function buildLatLngQuery(lat, lng) {
	var searchRadius = 50;
	var point = new GeoPoint(lat, lng);
	var coordinates = point.boundingCoordinates(searchRadius);

	// lat/lng ranges pulled off coordinates for clarity
	var latLow = coordinates[0]._degLat;
	var latHigh = coordinates[1]._degLat;
	var lngLow = coordinates[0]._degLon;
	var lngHigh = coordinates[1]._degLon;

	var query = {
		lat: {
			$gt: latLow,
			$lt: latHigh
		},
		lng: {
			$gt: lngLow,
			$lt: lngHigh
		}
	}

	return query;
}
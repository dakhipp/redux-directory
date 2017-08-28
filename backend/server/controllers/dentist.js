const Dentist = require('../models/dentist');
const GeoPoint = require('geopoint');

exports.getDentist = function(req, res, next) {
	if(req.query.id) {
		getDentistById(req, res, next);
	} else if(req.query.lat && req.query.lng && req.query.office_name) {
		getDentistsLatLngOffice(req, res, next);
	} else {
		getAll(req, res, next);
	}
}

exports.postDentist = function(req, res, next) {
	if(req.body._id) {
		updateDentist(req, res, next);
	} else {
		createNewDentist(req, res, next);
	}
}

exports.deleteDentist = function(req, res, next) {
	Dentist
	.findById(req.query.id)
	.exec(function(err, dentist) {
		if(err) { return next(err); }
		dentist.remove();
		res.send({message: 'Dentist '+dentist.id+' successfully deleted.'});
	});
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

// get basic db search conditions used with req.query.page to implement pagination
function getSearchConditions(page) {
	return {
		page: page || 0,
		limit: 10
	}
}

// fetches one dentist by using res.query.id
function getDentistById(req, res, next) {
	Dentist
	.findById(req.query.id)
	.exec(function(err, dentist) {
		if(err) { return next(err); }
		res.send([dentist]);
	});
}

// fetches dentists based on url query options, only exicutes if at least res.query.lat & res.query.lng are present
function getDentistsLatLngOffice(req, res, next) {
	// sets skip & limit conditions based on page url query 
	var conditions = getSearchConditions(req.query.page);

	// builds basic 50 meter radius lat lng search query
	var query = buildLatLngQuery(parseFloat(req.query.lat), parseFloat(req.query.lng));

	// accounts for featured flag by adding to search query if present in url
	if(req.query.featured) {
		query.featured = req.query.featured
	}

	// accounts for office name string in query if present in url
	if(req.query.office_name) {
		query.office_name = {
			"$regex": req.query.office_name, "$options": "i"
		}
	}

	// execute database search
	Dentist
	.find(query)
	.skip(conditions.page*conditions.limit)
	.limit(conditions.limit)
	.exec(function(err, dentist) {
		if(err) { return next(err); }
		res.send(dentist);
	});
};

// fall back / default fetch all dentists function, accounts for featured flag
function getAll(req, res, next) {
	var conditions = getSearchConditions(req.query.page);
	var query = {};

	// accounts for featured flag if present in req.query.featured
	if(req.query.featured) {
		query.featured = req.query.featured
	}

	// execute query
	Dentist
	.find(query)
	.skip(conditions.page*conditions.limit)
	.limit(conditions.limit)
	.exec(function(err, dentist) {
		if(err) { return next(err); }
		res.send(dentist);
	});
}

// create new dentist
function createNewDentist(req, res, next) {
	var dentist = new Dentist(req.body);

	dentist.save(function(err) {
		if(err) { return next(err); }

		res.send(dentist);
	});
}

// update already exisiting dentist
function updateDentist(req, res, next) {
	Dentist.findById(req.body._id, function (err, dentist) {
		if(err) { return next(err); }
	  
	  	Object.assign(dentist, req.body);

	  	dentist.save(function (err) {
	    	if(err) { return next(err); }
	    	res.send(dentist);
	  	});
	});
}
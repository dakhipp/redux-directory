const _ = require('lodash');
const baiduMap = require('baidumap');
const bdmap = baiduMap.create({'ak':'ktkStFjoEM5f1hHWEA3RB1PFmURrw3m6'});

exports.getLocation = function(req, res, next) {
	if(req.query.location && req.query.location.length >= 3) {
		var options = {'query': req.query.location, 'region': 'China'};
		bdmap.suggestion(options, function(err, res2) {
			if(err) { return next(err); }
			res.send(
				// remove objects without location/coords and only return 5 results
				_.slice(_.filter(JSON.parse(res2).result, function(obj) {
					if(_.has(obj, 'location')) {
						return obj;
					}
				}), 0, 5)
			);
		});
	} else {
		res.send([]);
	}
}
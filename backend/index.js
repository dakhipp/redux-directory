var config = require('./server/config');
var app = require('./server');
var logger = require('./server/utils/logger');

app.listen(config.port);
logger.log('listening on http://localhost:' + config.port);
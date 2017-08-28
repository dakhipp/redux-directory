// starting point of server
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const cors = require('cors');
const config = require('./config');
const filter = require('content-filter');

// DB setup
mongoose.connect(config.db.url);

// App setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use(filter());

app.use('/v1', router);

app.use(function(err, req, res, next) {
	logger.error(err.stack);
  	res.status(500).send({'error': 'Somthing went wrong.'});
});

// export the app for testing
module.exports = app;
// Setup for connection database

// Node modules to request
var pg = require('pg');

// Pick the database to connect to;
var dbUrl = {
	user: process.argv.POSTGRES_USER,
	password: process.argv.POSTGRES_PASSWORD,
	database: 'quotester_app',
	host: 'localhost',
	port: 5432,
};

// Creating a client to connect to, which as you see, uses the object that we set up
var pgClient = new pg.Client(dbUrl);

// Officially connecting to that postgres database
pgClient.connect();

var express = require('express');
var path = require('path');

var router = express.Router();

// GET route
router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

// POST Route
router.post('/api/quote', (req, res) => {
	console.log(req.body);
});


// Export this function this for the server connection to take hold
module.exports = router;

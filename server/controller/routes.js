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
		// console.log(req.body); shows me the user input.
// checking that the user does not leave both fields blank then submits.
	if (req.body.name !== '' && req.body.quote !== '') {
		var query = 'INSERT into bulletinboard (name, quote) VALUES ($1, $2)';
		pgClient.query(query, [req.body.name, req.body.quote], (error, enterQuote) => {
			// console.log(enterQuote);
			if (error) {
				res.json(error); // if error, send error to client.
			} else {
				res.json(enterQuote); // if no err, send back an obj to the client.
			}
		});
// if name blank and message not blank then name becomes "Guest".
	} else if (req.body.name === ''  & req.body.quote !== '') {
		var queryTwo = "INSERT INTO bulletinboard (name, quote) VALUES ($1, $2)";
		pgClient.query(queryTwo, ["Anonymous", req.body.quote], (error, enterQuoteButNoName) => {
			// console.log(enterQuoteButNoName);
			if (error) {
				res.json(error);
			} else {
				res.json(enterQuoteButNoName);
			}
		});
	} else if ((req.body.name !== '' && req.body.quote === '') || (req.body.name === '' && req.body.quote === '')) {
		res.json("null_message");
	}
});

// Get Route 2
router.get('/api/quotes', (req, res) => {
	var queryThree = 'SELECT * FROM bulletinboard';
	pgClient.query(queryThree, (error, getQuote) => {
		console.log(getQuote);
		if (error) {
			res.json(error);
		} else {
			res.json(getQuote);
		}
 	});
});

// DELETE Route
router.delete('/api/delete-quote/:id', (req, res) => {
	pgClient.query('DELETE FROM bulletinboard WHERE id=' + req.params.id, (err, res) => {
		console.log(res);
		console.log(req.params.id);
		if (err) {
			console.log(err);
		}
	});
});

// PUT Route
router.put('/api/update-quote/:id', (req, res) => {
	// console.log(req.body);
	pgClient.query('UPDATE bulletinboard SET quote=$1 WHERE id=' + req.params.id, [req.body.quote], (err, results) => {
		// console.log(results); shows me the result of the quote post from the questbook table.
		if (err) {
			res.json(err);
		}
		res.json({ message: "Message Updated" });
	});
});

// Export this function this for the server connection to take hold
module.exports = router;

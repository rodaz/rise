var express = require('express');
var router = express.Router();
var Pact = require('../models/pact');

var data = [
	['hello', 'hi', 'kia', 78, 45],
	['hello', 'hi', 'kiac', 478, 45],
	['hello', 'hi', 'kiaz', 578, 45],
	['hello', 'hi', 'kiax', 678, 45]
];

router.post('/load', function (req, res) {
	console.log('true');
	Pact.find(function(err, pacts) {
		if(err) return console.log(err);
		console.log(pacts);
		res.send(pacts);
	});
});

router.post('/save', function (req, res) {
	req.body.data.forEach(function(row) {
		var pact = new Pact({
			branch: row[0]?row[0]:'',
			partner_id: row[1]?row[1]:'',
			date_reg: row[2]?row[1]:new Date(),
			date_close: row[3]?row[1]:new Date(),
			partner: row[4]?row[1]:'',
			subject: row[5]?row[1]:'',
			amount: row[6]?row[1]:'',
			currency: row[7]?row[1]:'',
			validity: row[8]?row[1]:new Date(),
			key: row[9]?row[1]:'',
			exec: row[10]?row[1]:'',
			done: row[11]?row[1]:false
		});
		pact.save(function (err) {
			if (err) console.log(err);
			console.log('Done '+pact);
		});
	});
	res.end();
});

module.exports = router;
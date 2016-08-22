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
	res.send(data);
});

router.post('/save', function (req, res) {
	req.body.data.forEach(function(row) {
		var pact = new Pact({
			branch: row[0],
			partner_id: row[1],
			date_reg: row[2],
			date_close: row[3],
			partner: row[4],
			subject: row[5],
			amount: row[6],
			currency: row[7],
			validity: row[8],
			exec: row[9],
			done: row[10]
		});
		// pact.save(function (err) {
		// 	if (err) console.log(err);
		// 	console.log('Done');
		// });
	});
	res.end();
});

module.exports = router;
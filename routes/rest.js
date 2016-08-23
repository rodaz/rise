var express = require('express');
var router = express.Router();
var Pact = require('../models/pact');

var data;

router.post('/load', function (req, res) {
	console.log('true');
	Pact.find(function(err, pacts) {
		if(err) return console.log(err);
		console.log(pacts);
		data = pacts;
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

router.get('/edit/:id', function(req, res) {
	Pact.findOne({_id: req.params.id}, function(err, find_pact) {
		if(err) return console.log(err);
		console.log(find_pact);
		res.render('edit', { pact: find_pact});
	});
});

router.post('/saveOne', function(req, res) {
	console.log('here: '+req.body.date+' '+typeof req.body.date)
	res.end();
});

module.exports = router;
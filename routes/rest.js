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
			date_reg: row[2]?row[2]:new Date(),
			date_close: row[3]?row[3]:new Date(),
			partner: row[4]?row[4]:'',
			subject: row[5]?row[5]:'',
			amount: row[6]?row[6]:'',
			currency: row[7]?row[7]:'',
			validity: row[8]?row[8]:new Date(),
			key: row[9]?row[9]:'',
			exec: row[10]?row[10]:'',
			done: row[11]?row[11]:false
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
	var row = req.body;
	console.log(row);

	var pact = new Pact({
			branch: row[1]?row[1]:'',
			partner_id: row[2]?row[2]:'',
			date_reg: row[3]?row[3]:new Date(),
			date_close: row[4]?row[4]:new Date(),
			partner: row[5]?row[5]:'',
			subject: row[6]?row[6]:'',
			amount: row[7]?row[7]:'',
			currency: row[8]?row[8]:'',
			validity: row[9]?row[9]:new Date(),
			key: row[10]?row[10]:'',
			exec: row[11]?row[11]:'',
			done: row[12]?row[12]:false
		});
	Pact.findOneAndUpdate({_id: row._id}, pact, function(err){
		if(err) console.log(err);
	});
	res.end();
});

router.get('/add', function(req, res){
	Pact.find(function(err, pacts){
			if(err) console.log(err)
			else {
				// pacts.forEach(val, function(){
				// 	des.push(val.department)
				// });
				res.render('add', { title: 'Express', pacts: pacts });
			}
		});
});

router.get('/search', function(req, res){
	Pact.find({})
});

module.exports = router;
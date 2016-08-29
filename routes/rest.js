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
	var deps=[], parts=[], exes=[];
	Pact.find(function(err, pacts){
		if(err) console.log(err)
		else {
			pacts.forEach(function(val) {
				deps.push(val.branch);
				parts.push(val.partner);
				exes.push(val.exec);
			});

			Pact.findOne({_id: req.params.id}, function(err, fp) {
				if(err) return console.log(err);
				console.log(fp);
				res.render('edit', {
					br: fp.branch,
					id: fp.partner_id,
					re: fp.date_reg,
					cl: fp.date_close,
					pa: fp.partner,
					th: fp.subject,
					am: fp.amount,
					cu: fp.currency,
					da: fp.date,
					ke: fp.key,
					ex: fp.exec,
					d: fp.done,
					deps: unique(deps),
					parts: unique(parts),
					exes: unique(exes)
				});
			});
		}
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
	var deps=[], parts=[], exes=[];
	Pact.find(function(err, pacts){
		if(err) console.log(err)
		else {
			pacts.forEach(function(val) {
				deps.push(val.branch);
				parts.push(val.partner);
				exes.push(val.exec);
			});

			res.render('add', { 
				title: 'Express', 
				deps: unique(deps),
				parts: unique(parts),
				exes: unique(exes)
			});
		}
	});
});

router.post('/search', function(req, res) {
	var params = {};
	if (req.body.branch) {params.branch = req.body.branch}
	if (req.body.partner) {params.partner = req.body.partner}
	if (req.body.exec) {params.exec = req.body.exec}
	if (req.body.done) {params.done = req.body.done}
	console.log(req.body);
	Pact.find(params, function(err, search_data) {
		if(err) console.log(err);
		console.log(search_data);
	});
	res.end();
});

router.post('/add', function(req, res) {
	var row = req.body;
	var pact = new Pact({
		branch: row.branch?row.branch:'',
		partner_id: row.partner_id?row.partner_id:'',
		date_reg: row.reg?row.reg:new Date(),
		date_close: row.close?row.close:new Date(),
		partner: row.partner?row.partner:'',
		subject: row.theme?row.theme:'',
		amount: row.amount?row.amount:'',
		currency: row.curr?row.curr:'',
		validity: row.date?row.date:new Date(),
		key: row.key?row.key:'',
		exec: row.exec?row.exec:'',
		done: row.done?row.done:false
	});
	pact.save(function (err) {
		if (err) console.log(err);
		console.log('Done '+pact);
	});
});

function unique(arr) {
  var obj = {};

  for (var i = 0; i < arr.length; i++) {
    var str = arr[i];
    obj[str] = true;
  }

  return Object.keys(obj);
}

module.exports = router;
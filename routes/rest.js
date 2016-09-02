var express = require('express');
var router = express.Router();
var Pact = require('../models/pact');
var moment = require('moment');

router.get('/add', function(req, res) {
    var deps=[], parts=[], exes=[], ids=[];
    Pact.find(function(err, pacts) {
        if (err) console.log(err)
        else {
            pacts.forEach(function(val) {
                ids.push(val.pact_id);
                deps.push(val.branch);
                parts.push(val.partner);
                exes.push(val.exec);
            });
            console.log(ids);
            var t = Math.max.apply(null, ids);
            res.render('add', {
                next_id: t?t+1:1,  
                deps: unique(deps),
                parts: unique(parts),
                exes: unique(exes)
            });
        }
    });
});

router.get('/edit/:id', function(req, res) {
    var deps=[], parts=[], exes=[];
    Pact.find(function(err, pacts) {
        if (err) console.log(err)
        else {
            pacts.forEach(function(val) {
                deps.push(val.branch);
                parts.push(val.partner);
                exes.push(val.exec);
            });

            Pact.findOne({_id: req.params.id}, function(err, fp) {
                if (err) return console.log(err);
                res.render('edit', {
                    _i: fp._id,
                    pid: fp.pact_id,
                    br: fp.branch,
                    id: fp.partner_id,
                    re: moment(fp.date_reg).format('YYYY-MM-DD'),
                    cl: moment(fp.date_close).format('YYYY-MM-DD'),
                    pa: fp.partner,
                    th: fp.subject,
                    am: fp.amount,
                    cu: fp.currency,
                    da: moment(fp.date).format('YYYY-MM-DD'),
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

router.post('/add', function(req, res) {
    var row = req.body;
    var pact = new Pact({
        pact_id: row.pact_id?row.pact_id:0,
        branch: row.branch?row.branch:'',
        partner_id: row.partner_id?row.partner_id:'',
        date_reg: row.reg?row.reg:moment(),
        date_close: row.close?row.close:moment(),
        partner: row.partner?row.partner:'',
        subject: row.theme?row.theme:'',
        amount: row.amount?row.amount:'',
        currency: row.curr?row.curr:'',
        validity: row.date?row.date:moment(),
        key: row.key?row.key:'',
        exec: row.exec?row.exec:'',
        done: row.done?row.done:''
    });
    pact.save(function (err) {
        if (err) console.log(err);
    });
    res.redirect('/');
});

router.post('/save', function(req, res) {
    var row = req.body;
    var pact = {
            pact_id: row.pact_id?row.pact_id:0,
            branch: row.branch?row.branch:'',
            partner_id: row.partner_id?row.partner_id:'',
            date_reg: row.reg?row.reg:moment(),
            date_close: row.close?row.close:moment(),
            partner: row.partner?row.partner:'',
            subject: row.theme?row.theme:'',
            amount: row.amount?row.amount:'',
            currency: row.curr?row.curr:'',
            validity: row.date?row.date:moment(),
            key: row.key?row.key:'',
            exec: row.exec?row.exec:'',
            done: row.done?row.done:''
        };
    Pact.findByIdAndUpdate(row._id, pact, function(err){
        if(err) console.log(err);
    });
    res.redirect('/');
});

router.post('/search', function(req, res) {
    var params = {};
    if (req.body.year)
        params.date_reg = {
            $gt:moment(req.body.year+'-01-01'),
            $lt:moment(req.body.year+'-12-31')
        };
    if (req.body.branch) params.branch = req.body.branch;
    if (req.body.partner) params.partner = req.body.partner;
    if (req.body.exec) params.exec = req.body.exec;
    if (req.body.done) params.done = req.body.done;
    Pact.find(params, function(err, search_data) {
        if(err) console.log(err);
        res.send(search_data);
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
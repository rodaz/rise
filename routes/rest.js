var express = require('express');
var router = express.Router();
var Pact = require('../models/pact');
var moment = require('moment');
var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/'+req.body.branch)
    },
    filename: function (req, file, cb) {
        cb(null, req.body.pact_id+'_'+req.body.partner)
    }
});
// var upload = multer({ dest : 'public/images/' });
var upload = multer({storage:storage});
var path = require('path');

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
                next_id: t>0?t+1:1,  
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
                    d: fp.done,
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
                    rm: fp.remark,
                    scan: fp.scan,
                    deps: unique(deps),
                    parts: unique(parts),
                    exes: unique(exes)
                });
            });
        }
    });

});

router.post('/add', upload.single('scan'), function(req, res) {
    var row = req.body;
    var pact = new Pact({
        done: row.done?row.done:'нет',
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
        scan: req.file?req.file.path:'',
        remark: row.remark?row.remark:''
    });
    pact.save(function (err) {
        if (err) console.log(err);
    });
    res.redirect('/');
});

router.post('/save', upload.single('scan'), function(req, res) {
    var row = req.body;
    var pact;
    console.log(req.file);
    if (req.file) {
        pact = {
            done: row.done?row.done:'нет',
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
            scan: req.file?req.file.path:'',
            remark: row.remark?row.remark:''
        };
    } else {
        pact = {
            done: row.done?row.done:'нет',
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
            remark: row.remark?row.remark:''
        };
    }
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

// router.get('/scan', function(req, res) {
//     console.log(req.body.id);
//     Pact.findOne({_id: req.query.id}, function(err, fp) {
//         if (err) return console.log(err);
//         console.log(fp.scan);
//         res.download(path.resolve('./'+fp.scan), function(err){
//             if (err) {console.log(err);}
//         });
//     });
// });

function unique(arr) {
  var obj = {};

  for (var i = 0; i < arr.length; i++) {
    var str = arr[i];
    obj[str] = true;
  }

  return Object.keys(obj);
}

module.exports = router;
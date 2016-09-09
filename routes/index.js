var express = require('express');
var router = express.Router();
var Pact = require('../models/pact');

var isAuthenticated = function (req, res, next){
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = function(passport) {

	/* GET login page. */
	router.get('/', function(req, res) {
		res.render('index');
	});

	/* Handle login post */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/'
	}));

	/* Get registration page*/
	router.get('/signup', function(req, res) {
		res.render('register');
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		var deps=[], yes=[], parts=[], exes=[];
		Pact.find(function(err, pacts){
			if(err) console.log(err)
			else {
				pacts.forEach(function(val) {
					deps.push(val.branch);
					yes.push(val.date_reg.getFullYear());
					parts.push(val.partner);
					exes.push(val.exec);
				});

				res.render('home', {
					user: req.user,  
					deps: unique(deps),
					yes: unique(yes),
					parts: unique(parts),
					exes: unique(exes)
				});
			}
		});
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	/**
	*	List->Set
	*/
	function unique(arr) {
	  var obj = {};

	  for (var i = 0; i < arr.length; i++) {
	    var str = arr[i];
	    obj[str] = true;
	  }

	  return Object.keys(obj);
	}
	
	return router;

}

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
	// router.get('/', function(req, res) {
	// 	res.render('index', { title: 'Express' });
	// });
	router.get('/', function(req, res) {
		// var des, yes, pas, dos, scs;
		Pact.find(function(err, pacts){
			if(err) console.log(err)
			else {
				// pacts.forEach(val, function(){
				// 	des.push(val.department)
				// });
				res.render('home', { title: 'Express', pacts: pacts });
			}
		});
		
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
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;

}

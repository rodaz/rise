var login = require('./login');
var User = require('../models/user');
var signup = require('./signup');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		console.log('Cериализация пользователя: ', user);
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			console.log('Десериализация пользователя: ', user);
			done(err, user);
		});
	});

	login(passport);
	signup(passport);
}
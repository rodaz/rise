var mongoose = require('mongoose');
/**
*	Model for authorization user
*/
module.exports = mongoose.model('User', {
	username: String,
	password: String
});
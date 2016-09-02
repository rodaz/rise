var mongoose = require('mongoose');

var pactSchema = mongoose.Schema({
	pact_id: Number,
	branch: String,
	partner_id: String,
	date_reg: Date,
	date_close: Date,
	partner: String,
	subject: String,
	amount: String,
	currency: String,
	validity: Date,
	key: String,
	exec: String,
	done: String
});

var Pact = mongoose.model('Pact', pactSchema);

module.exports = Pact;
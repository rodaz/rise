var mongoose = require('mongoose');

var pactSchema = mongoose.Schema({
	branch: String,
	partner_id: String,
	date_reg: Date,
	date_close: Date,
	partner: String,
	subject: String,
	amount: Number,
	currency: String,
	validity: Date,
	exec: String,
	done: Boolean
});

var Pact = mongoose.model('Pact', pactSchema);

module.exports = Pact;
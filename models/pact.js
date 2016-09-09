var mongoose = require('mongoose');

/**
*	Main model. One row in table - one object
*/
var pactSchema = mongoose.Schema({
	done: String,
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
	scan: String,
	remark: String
});

var Pact = mongoose.model('Pact', pactSchema);

module.exports = Pact;
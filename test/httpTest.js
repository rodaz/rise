var request = require('supertest');
var app = require('../app.js');

describe('Auth requests: ', function () {
	it('auth GET request', function (done) {
		request(app)
			.get('/')
			.expect('Content-Type', /html/)
			.expect(200, done)
	})

	it('auth POST request', function (done) {
		request(app)
			.post('/load')
			.expect(200, done)
	})

	// it ('login in', function (done) {
	// 	request(app)
	// 		.post('/login')
	// 		.send({log:'dark', pass:'lord'})
	// 		.expect(200, done)
	// })
});
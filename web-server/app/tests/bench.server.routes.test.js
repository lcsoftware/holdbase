'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Bench = mongoose.model('Bench'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, bench;

/**
 * Bench routes tests
 */
describe('Bench CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Bench
		user.save(function() {
			bench = {
				name: 'Bench Name'
			};

			done();
		});
	});

	it('should be able to save Bench instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bench
				agent.post('/benches')
					.send(bench)
					.expect(200)
					.end(function(benchSaveErr, benchSaveRes) {
						// Handle Bench save error
						if (benchSaveErr) done(benchSaveErr);

						// Get a list of Benches
						agent.get('/benches')
							.end(function(benchesGetErr, benchesGetRes) {
								// Handle Bench save error
								if (benchesGetErr) done(benchesGetErr);

								// Get Benches list
								var benches = benchesGetRes.body;

								// Set assertions
								(benches[0].user._id).should.equal(userId);
								(benches[0].name).should.match('Bench Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Bench instance if not logged in', function(done) {
		agent.post('/benches')
			.send(bench)
			.expect(401)
			.end(function(benchSaveErr, benchSaveRes) {
				// Call the assertion callback
				done(benchSaveErr);
			});
	});

	it('should not be able to save Bench instance if no name is provided', function(done) {
		// Invalidate name field
		bench.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bench
				agent.post('/benches')
					.send(bench)
					.expect(400)
					.end(function(benchSaveErr, benchSaveRes) {
						// Set message assertion
						(benchSaveRes.body.message).should.match('Please fill Bench name');
						
						// Handle Bench save error
						done(benchSaveErr);
					});
			});
	});

	it('should be able to update Bench instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bench
				agent.post('/benches')
					.send(bench)
					.expect(200)
					.end(function(benchSaveErr, benchSaveRes) {
						// Handle Bench save error
						if (benchSaveErr) done(benchSaveErr);

						// Update Bench name
						bench.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Bench
						agent.put('/benches/' + benchSaveRes.body._id)
							.send(bench)
							.expect(200)
							.end(function(benchUpdateErr, benchUpdateRes) {
								// Handle Bench update error
								if (benchUpdateErr) done(benchUpdateErr);

								// Set assertions
								(benchUpdateRes.body._id).should.equal(benchSaveRes.body._id);
								(benchUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Benches if not signed in', function(done) {
		// Create new Bench model instance
		var benchObj = new Bench(bench);

		// Save the Bench
		benchObj.save(function() {
			// Request Benches
			request(app).get('/benches')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Bench if not signed in', function(done) {
		// Create new Bench model instance
		var benchObj = new Bench(bench);

		// Save the Bench
		benchObj.save(function() {
			request(app).get('/benches/' + benchObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', bench.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Bench instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bench
				agent.post('/benches')
					.send(bench)
					.expect(200)
					.end(function(benchSaveErr, benchSaveRes) {
						// Handle Bench save error
						if (benchSaveErr) done(benchSaveErr);

						// Delete existing Bench
						agent.delete('/benches/' + benchSaveRes.body._id)
							.send(bench)
							.expect(200)
							.end(function(benchDeleteErr, benchDeleteRes) {
								// Handle Bench error error
								if (benchDeleteErr) done(benchDeleteErr);

								// Set assertions
								(benchDeleteRes.body._id).should.equal(benchSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Bench instance if not signed in', function(done) {
		// Set Bench user 
		bench.user = user;

		// Create new Bench model instance
		var benchObj = new Bench(bench);

		// Save the Bench
		benchObj.save(function() {
			// Try deleting Bench
			request(app).delete('/benches/' + benchObj._id)
			.expect(401)
			.end(function(benchDeleteErr, benchDeleteRes) {
				// Set message assertion
				(benchDeleteRes.body.message).should.match('User is not logged in');

				// Handle Bench error error
				done(benchDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Bench.remove().exec();
		done();
	});
});
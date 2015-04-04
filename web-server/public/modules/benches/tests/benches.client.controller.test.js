'use strict';

(function() {
	// Benches Controller Spec
	describe('Benches Controller Tests', function() {
		// Initialize global variables
		var BenchesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Benches controller.
			BenchesController = $controller('BenchesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Bench object fetched from XHR', inject(function(Benches) {
			// Create sample Bench using the Benches service
			var sampleBench = new Benches({
				name: 'New Bench'
			});

			// Create a sample Benches array that includes the new Bench
			var sampleBenches = [sampleBench];

			// Set GET response
			$httpBackend.expectGET('benches').respond(sampleBenches);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.benches).toEqualData(sampleBenches);
		}));

		it('$scope.findOne() should create an array with one Bench object fetched from XHR using a benchId URL parameter', inject(function(Benches) {
			// Define a sample Bench object
			var sampleBench = new Benches({
				name: 'New Bench'
			});

			// Set the URL parameter
			$stateParams.benchId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/benches\/([0-9a-fA-F]{24})$/).respond(sampleBench);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bench).toEqualData(sampleBench);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Benches) {
			// Create a sample Bench object
			var sampleBenchPostData = new Benches({
				name: 'New Bench'
			});

			// Create a sample Bench response
			var sampleBenchResponse = new Benches({
				_id: '525cf20451979dea2c000001',
				name: 'New Bench'
			});

			// Fixture mock form input values
			scope.name = 'New Bench';

			// Set POST response
			$httpBackend.expectPOST('benches', sampleBenchPostData).respond(sampleBenchResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Bench was created
			expect($location.path()).toBe('/benches/' + sampleBenchResponse._id);
		}));

		it('$scope.update() should update a valid Bench', inject(function(Benches) {
			// Define a sample Bench put data
			var sampleBenchPutData = new Benches({
				_id: '525cf20451979dea2c000001',
				name: 'New Bench'
			});

			// Mock Bench in scope
			scope.bench = sampleBenchPutData;

			// Set PUT response
			$httpBackend.expectPUT(/benches\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/benches/' + sampleBenchPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid benchId and remove the Bench from the scope', inject(function(Benches) {
			// Create new Bench object
			var sampleBench = new Benches({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Benches array and include the Bench
			scope.benches = [sampleBench];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/benches\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBench);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.benches.length).toBe(0);
		}));
	});
}());
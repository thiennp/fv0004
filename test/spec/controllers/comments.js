'use strict';

describe('Controller: CommentsCtrl', function () {

	// load the controller's module
	beforeEach(module('fv0004App'));

	var CommentsCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		CommentsCtrl = $controller('CommentsCtrl', {
			$scope: scope
		});
	}));

	it('should attach a list of awesomeThings to the scope', function () {
		expect(scope.comments.length).toBe(3);
	});
});
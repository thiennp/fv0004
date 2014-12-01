'use strict';

angular.module('fv0004App')
	.controller('CommentUsersCtrl', function ($scope, $firebase, $wakanda) {
		$scope.loaded = !!$wakanda ? 'loaded' : 'not loaded';
		var ref = new Firebase('https://popping-inferno-4762.firebaseio.com/');

		ref.child('fv0004/users').on('value', function (snapshot) {
			$scope.users = snapshot.val();
			// Update the flow
			$scope.$apply();
		});

		$scope.initialized = 'not initialized';

		// Create a proxy of the server model
		$wakanda.init('../../http://kuveno.us.wak-apps.com/').then(function oninit(ds) {
			$scope.initialized = 'initialized';
			// lets inspect the name of the available ressources
			$scope.dataClasses = Object.keys(ds.getDataClasses());
		});
	});
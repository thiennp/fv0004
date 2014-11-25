'use strict';

angular.module('fv0004App')
	.controller('CommentUsersCtrl', function ($scope, $firebase) {
		var ref = new Firebase('https://popping-inferno-4762.firebaseio.com/');

		ref.child('fv0004/users').on('value', function (snapshot) {
			$scope.users = snapshot.val();
			// Update the flow
			$scope.$apply();
		});
	});
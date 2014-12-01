'use strict';

angular.module('fv0004App')
	.controller('CommentGroupsCtrl', function ($scope, $firebase, $routeParams, $rootScope, $wakanda) {
		var ref = new Firebase('https://popping-inferno-4762.firebaseio.com/');

		$rootScope.userid = parseInt($routeParams.userId);
		ref.child('fv0004/groups').on('value', function (snapshot) {
			var groups = snapshot.val();
			$scope.groups = [];
			for (var i in groups) {
				if (groups[i].user_ids.indexOf($rootScope.userid) > -1) {
					$scope.groups.push(groups[i]);
				}
			}
			$scope.$apply();
		});
	});
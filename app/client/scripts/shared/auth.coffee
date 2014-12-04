'use strict';

angular.module('app.auth.controllers', [])

.controller('SignUpCtrl', [
	'$scope', '$stateParams',
	($scope, $stateParams) ->
])

.controller('SignInCtrl', [
	'$scope'
	($scope) ->
		console.log 'Sign In'
])
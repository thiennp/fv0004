'use strict';

angular.module('app.action.controllers', [])

.controller('SignUpCtrl', [
	'$scope'
	($scope) ->
		console.log 'Sign Up'
])

.controller('SignInCtrl', [
	'$scope'
	($scope) ->
		console.log 'Sign In'
])
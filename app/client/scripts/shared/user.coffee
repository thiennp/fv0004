'use strict';

angular.module('app.user.controllers', [])

.controller('ProfileCtrl', [
	'$scope'
	($scope) ->
		console.log 'Profile'
])

.controller('GroupsCtrl', [
	'$scope'
	($scope) ->
		console.log 'Groups'
])

.controller('MyTaskCtrl', [
	'$scope'
	($scope) ->
		console.log 'My Task'
])

.controller('UpCommingMeetingCtrl', [
	'$scope'
	($scope) ->
		console.log 'Up Comming Meeting'
])
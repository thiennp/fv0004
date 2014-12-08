'use strict';

angular.module('app.user.controllers', [])

.controller('ProfileCtrl', [
	'$rootScope'
	'$scope'
	'Auth'
	($rootScope, $scope, Auth) ->
		Auth.verify().then (data)->
			if data
				if $rootScope.onBack
					$rootScope.onBack = false
				else
					$rootScope.$stateHistory.push 'user.Profile'
])

.controller('SendFeedbackCtrl', [
	'$rootScope'
	'$scope'
	'Auth'
	($rootScope, $scope, Auth) ->
		Auth.verify().then (data)->
			if data
				if $rootScope.onBack
					$rootScope.onBack = false
				else
					$rootScope.$stateHistory.push 'user.SendFeedback'
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
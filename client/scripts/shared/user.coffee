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
	'User'
	($rootScope, $scope, Auth, User) ->
		Auth.verify().then (data)->
			if data
				if $rootScope.onBack
					$rootScope.onBack = false
				else
					$rootScope.$stateHistory.push 'user.SendFeedback'
		$scope.sendFeedback = ->
			if !$scope.title
				$scope.error = true
				$scope.errorMessage = 'Please enter feedback title'
				document.getElementById('title').focus()
				$scope.titleError = true
			else
				User.sendFeedback($scope.title, $scope.content).then (data)->
					if data
						$scope.error = false
						$scope.success = true
						$scope.titleError = false
						$scope.title = ''
						$scope.content = ''
					else
						$scope.error = true
						$scope.errorMessage = 'Feedback can not be sent'
						$scope.titleError = false
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
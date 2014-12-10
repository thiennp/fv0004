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

.controller('UpdateProfileCtrl', [
	'$rootScope'
	'$scope'
	'$state'
	'$wakanda'
	'Assist'
	'Auth'
	($scope, $rootScope, $state, $wakanda, Assist, Auth) ->
		$scope.email = ''
		if $rootScope.onBack
			$rootScope.onBack = false
		else
			$rootScope.$stateHistory.push 'auth.SignUp'

		$scope.linkedinUpdate = ->

		$scope.facebookUpdate = ->
			Auth.facebookInfo()

		$scope.updateProfile = ->
			if !$rootScope.firstName
				$scope.error = true
				$scope.errorMessage = "Please enter your first name"
				$scope.firstNameError = true
				$scope.lastNameError = false
				document.getElementById('firstName').focus()
			else if !$rootScope.lastName
				$scope.error = true
				$scope.errorMessage = "Please enter your last name"
				$scope.firstNameError = false
				$scope.lastNameError = true
				document.getElementById('lastName').focus()
			else
			# 	newUser = $wakanda.$ds.User.signUpNewUser $scope.email, $scope.password
			# 	if newUser is null
			# 		$scope.error = true
			# 		$scope.emailError = true
			# 		$scope.passwordError = false
			# 		$scope.retypePasswordError = false
			# 		$scope.showSignUp = true
			# 		$scope.errorMessage = "Sign up unsuccessful"
			# 	else
			# 		$rootScope.user = newUser
			# 		if newUser.status is "ok-user-and-account-added"
				localStorage.setItem 'user_first_name', $rootScope.firstName
				localStorage.setItem 'user_last_name', $rootScope.lastName
				$state.go 'user.Profile'
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
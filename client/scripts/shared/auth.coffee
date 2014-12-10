'use strict';

angular.module('app.auth.controllers', [])

.controller('SignUpCtrl', [
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

		$scope.facebookRegister = ->
			Auth.facebookLogin()

		$scope.emailRegister = ->
			$scope.email = $rootScope.email
			$scope.password = $rootScope.password
			$scope.retypePassword = $rootScope.retypePassword
			if !$scope.email
				$scope.error = true
				$scope.errorMessage = "Please enter your email address"
				$scope.emailError = true
				$scope.passwordError = false
				$scope.retypePasswordError = false
				$scope.showSignUp = false
				document.getElementById('email').focus()
			else if !Assist.validateEmail($scope.email)
				$scope.error = true
				$scope.errorMessage = "Please enter correct email address"
				$scope.emailError = true
				$scope.passwordError = false
				$scope.retypePasswordError = false
				$scope.showSignUp = false
				document.getElementById('email').focus()
			else if !$scope.password
				$scope.error = true
				$scope.errorMessage = "Please enter your password"
				$scope.emailError = false
				$scope.passwordError = true
				$scope.retypePasswordError = false
				$scope.showSignUp = false
				document.getElementById('password').focus()
			else if String($scope.password).length < 8
				$scope.error = true
				$scope.errorMessage = 'Password must be contain at least 8 characters'
				document.getElementById('password').focus()
				$scope.emailError = false
				$scope.passwordError = true
				$scope.retypePasswordError = false
				$scope.showSignUp = false
			else if String($scope.password) isnt String($scope.retypePassword)
				$scope.error = true
				$scope.errorMessage = 'Password does not match the confirm password'
				document.getElementById('password').focus()
				$scope.emailError = false
				$scope.passwordError = true
				$scope.retypePasswordError = true
				$scope.showSignUp = false
			else
				newUser = $wakanda.$ds.User.signUpNewUser $scope.email, $scope.password
				if newUser is null
					$scope.error = true
					$scope.emailError = true
					$scope.passwordError = false
					$scope.retypePasswordError = false
					$scope.showSignUp = true
					$scope.errorMessage = "Sign up unsuccessful"
				else
					$rootScope.user = newUser
					if newUser.status is "ok-user-and-account-added"
						$state.go 'user.ProfileUpdate'
])

.controller('SignInCtrl', [
	'$q'
	'$rootScope'
	'$scope'
	'$state'
	'$wakanda'
	'Assist'
	'Auth'
	'Facebook'
	($q, $rootScope, $scope, $state, $wakanda, Assist, Auth, Facebook) ->
		if $rootScope.onBack
			$rootScope.onBack = false
		else
			$rootScope.$stateHistory.push 'auth.SignIn'
		defer = $q.defer()
					
		$scope.facebookLogin = ->
			Auth.facebookLogin()

		$scope.linkedinLogin = ->
			window.location.href = 'https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=7581d2bszc4sid&scope=r_emailaddress%20r_fullprofile%20r_basicprofile&state=KbyUmhTLMpYj7CD2di7JKP1PcqmLlkPt&redirect_uri=http://localhost:9000'

		$scope.emailLogin = ->
			if !$scope.email
				$scope.error = true
				$scope.errorMessage = "Please enter your email address"
				$scope.emailError = true
				$scope.passwordError = false
				$scope.showSignUp = false
				document.getElementById('email').focus()
			else if !Assist.validateEmail($scope.email)
				$scope.error = true
				$scope.errorMessage = "Please enter correct email address"
				$scope.emailError = true
				$scope.passwordError = false
				$scope.showSignUp = false
				document.getElementById('email').focus()
			else if !$scope.password
				$scope.error = true
				$scope.errorMessage = "Please enter your password"
				$scope.emailError = false
				$scope.passwordError = true
				$scope.showSignUp = false
				document.getElementById('password').focus()
			else
				user = $wakanda.login $scope.email, $scope.password
				# if newUser is null
				# 	$scope.error = true
				# 	$scope.emailError = true
				# 	$scope.passwordError = false
				# 	$scope.showSignUp = true
				# 	$scope.errorMessage = "Your email address is not exist, please sign up"
				# else if newUser.isNew() is false
				# 	$scope.error = true
				# 	$scope.emailError = true
				# 	$scope.passwordError = false
				# 	$scope.showSignUp = true
				# 	$scope.errorMessage = "Your email address is not exist, please sign up"
				# else
				# 	$rootScope.user = newUser
				# 	$state.go 'user.Profile'
			return
])


.controller('ChangePasswordCtrl', [
	'$q'
	'$rootScope'
	'$scope'
	'Auth'
	($q, $rootScope, $scope, Auth) ->
		$scope.success = false
		$scope.error = false
		if $rootScope.onBack
			$rootScope.onBack = false
		else
			$rootScope.$stateHistory.push 'auth.ChangePassword'

		$scope.changePassword = ->
			if !$scope.currentPassword
				$scope.error = true
				$scope.errorMessage = 'Please enter current password'
				document.getElementById('currentPassword').focus()
				$scope.currentPasswordError = true
				$scope.newPasswordError = false
				$scope.retypeNewPasswordError = false
			else
				Auth.checkPassword($scope.currentPassword).then (data)->
					if data
						$scope.currentPasswordSuccess = true
						$scope.currentPasswordError = false
						if !$scope.newPassword
							$scope.error = true
							$scope.errorMessage = 'Please enter new password'
							document.getElementById('newPassword').focus()
							$scope.newPasswordError = true
							$scope.retypeNewPasswordError = false
						else if String($scope.newPassword).length < 8
							$scope.error = true
							$scope.errorMessage = 'Password must be contain at least 8 characters'
							document.getElementById('newPassword').focus()
							$scope.newPasswordError = true
							$scope.retypeNewPasswordError = false
						else if String($scope.newPassword) isnt String($scope.retypeNewPassword)
							$scope.error = true
							$scope.errorMessage = 'Password does not match the confirm password'
							document.getElementById('newPassword').focus()
							$scope.newPasswordError = true
							$scope.retypeNewPasswordError = true
						else
							$scope.newPasswordError = false
							$scope.retypeNewPasswordError = false
							Auth.changePassword($scope.newPassword).then (data)->
								if data
									$scope.error = false
									$scope.success = true
									$scope.currentPasswordSuccess = false
									$scope.currentPassword = ''
									$scope.newPassword = ''
									$scope.retypeNewPassword = ''
								else
									$scope.error = true
									$scope.errorMessage = 'Password can not be changed'
					else
						$scope.error = true
						$scope.errorMessage = 'Current password is not correct'
						document.getElementById('currentPassword').focus()
						$scope.currentPasswordError = true
						$scope.newPasswordError = false
						$scope.retypeNewPasswordError = false
])
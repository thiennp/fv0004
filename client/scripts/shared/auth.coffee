'use strict';

angular.module('app.auth.controllers', [])

.controller('SignUpCtrl', [
	'$rootScope'
	'$scope'
	'Facebook'
	'$state'
	($scope, $rootScope, Facebook, $state) ->
		if $rootScope.onBack
			$rootScope.onBack = false
		else
			$rootScope.$stateHistory.push 'auth.SignUp'
		$scope.facebookRegister = ->
			Facebook.getLoginStatus (response)->
				if response.status is 'connected' then $scope.loggedIn = true
				else $scope.loggedIn = false
				if $scope.loggedIn is false
					Facebook.login (response)->
						$rootScope.user = response
				else
					Facebook.api '/me', (response)->
						$rootScope.user = response
		$scope.emailRegister = ->
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
				newUser = $wakanda.$ds.User.signUpNewUser $scope.email, $scope.password
				if newUser is null
					$scope.error = true
					$scope.emailError = true
					$scope.passwordError = false
					$scope.showSignUp = true
					$scope.errorMessage = "Sign up unsuccessful"
				else
					$rootScope.user = newUser
					$state.go 'user.Profile'
])

.controller('SignInCtrl', [
	'$q'
	'$rootScope'
	'$scope'
	'$state'
	'$wakanda'
	'Assist'
	'Facebook'
	($q, $rootScope, $scope, $state, $wakanda, Assist, Facebook) ->
		if $rootScope.onBack
			$rootScope.onBack = false
		else
			$rootScope.$stateHistory.push 'auth.SignIn'
		defer = $q.defer()
		storeUser = (response)->
			$rootScope.user = response
			Assist.localeToCountry(response.locale).then (data)->
				localStorage.setItem 'user_id', response.id
				localStorage.setItem 'user_first_name', response.first_name
				localStorage.setItem 'user_last_name', response.last_name
				localStorage.setItem 'user_link', response.link
				localStorage.setItem 'user_locale', response.locale
				localStorage.setItem 'user_name', response.name
				localStorage.setItem 'user_timezone', response.timezone
				localStorage.setItem 'user_updated_time', response.updated_time
				localStorage.setItem 'user_verified', response.verified
				localStorage.setItem 'user_avatar', 'http://graph.facebook.com/'+response.id+'/picture'
				localStorage.setItem 'user_country', data
				$rootScope.user.country = localStorage.getItem 'user_country'
				$rootScope.user.picture = localStorage.getItem 'user_picture'
				defer.resolve $rootScope.user
			defer.promise
			
		$scope.facebookLogin = ->
			Facebook.getLoginStatus (response)->
				if response.status is 'connected' then $scope.loggedIn = true
				else $scope.loggedIn = false
				if $scope.loggedIn is false
					Facebook.login (response)->
						storeUser(response).then ->
							$state.go 'user.Profile'
				else
					Facebook.api '/me', (response)->
						storeUser(response).then ->
							$state.go 'user.Profile'

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
				# 	console.log newUser
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
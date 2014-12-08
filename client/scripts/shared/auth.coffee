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
])

.controller('SignInCtrl', [
	'$q'
	'$rootScope'
	'$scope'
	'$state'
	'Assist'
	'Facebook'
	($q, $rootScope, $scope, $state, Assist, Facebook) ->
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
])



.controller('ChangePasswordCtrl', [
	'$q'
	'$rootScope'
	'Auth'
	($q, $rootScope, Auth) ->
		if $rootScope.onBack
			$rootScope.onBack = false
		else
			$rootScope.$stateHistory.push 'auth.ChangePassword'
		changePassword = ->
			alert 'here'
			if String($scope.newPassword) isnt String($scope.retypeNewPassword)
				alert 'wrong'
])
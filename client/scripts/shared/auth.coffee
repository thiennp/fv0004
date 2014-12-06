'use strict';

angular.module('app.auth.controllers', [])

.controller('SignUpCtrl', [
	'$scope'
	'$rootScope'
	'Facebook'
	'$state'
	($scope, $rootScope, Facebook, $state) ->
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
	'$scope'
	'$rootScope'
	'Facebook'
	'$state'
	($scope, $rootScope, Facebook, $state) ->
		storeUser = (response)->
			$rootScope.user = response
			localStorage.setItem 'user_id', response.id
			localStorage.setItem 'user_first_name', response.first_name
			localStorage.setItem 'user_last_name', response.last_name
			localStorage.setItem 'user_link', response.link
			localStorage.setItem 'user_locale', response.locale
			localStorage.setItem 'user_name', response.name
			localStorage.setItem 'user_timezone', response.timezone
			localStorage.setItem 'user_updated_time', response.updated_time
			localStorage.setItem 'user_verified', response.verified
			response
			
		$scope.facebookLogin = ->
			Facebook.getLoginStatus (response)->
				if response.status is 'connected' then $scope.loggedIn = true
				else $scope.loggedIn = false
				if $scope.loggedIn is false
					Facebook.login (response)->
						storeUser response
						$state.go 'main'
				else
					Facebook.api '/me', (response)->
						storeUser response
						$state.go 'main'
])
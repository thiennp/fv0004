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
	'$rootScope'
	'$scope'
	'$state'
	'Assist'
	'Facebook'
	($rootScope, $scope, $state, Assist, Facebook) ->
		storeUser = (response)->
			$rootScope.user = response
			Assist.localeToCountry(response.locale).then (data)->
				console.log data
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
			
		$scope.facebookLogin = ->
			Facebook.getLoginStatus (response)->
				if response.status is 'connected' then $scope.loggedIn = true
				else $scope.loggedIn = false
				if $scope.loggedIn is false
					Facebook.login (response)->
						storeUser response
						$state.go 'user.profile'
				else
					Facebook.api '/me', (response)->
						storeUser response
						$state.go 'user.profile'

		$scope.linkedinLogin = ->
			window.location.href = 'https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=7581d2bszc4sid&scope=r_emailaddress%20r_fullprofile%20r_basicprofile&state=KbyUmhTLMpYj7CD2di7JKP1PcqmLlkPt&redirect_uri=http://localhost:9000'
])
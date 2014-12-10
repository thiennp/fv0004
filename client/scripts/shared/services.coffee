'use strict';

angular.module('app.services', [])

.factory 'Auth', [
	'$http'
	'$q'
	'$rootScope'
	'$state'
	'$wakanda'
	'Assist'
	'Facebook'
	($http, $q, $rootScope, $state, $wakanda, Assist, Facebook)->
		defer = $q.defer()
		verify: ->
			if localStorage.user_id is undefined
				defer.resolve false
				$state.go 'auth.SignIn'
			else
				defer.resolve true
			defer.promise

		linkedin: (code)->
			$http
				.post 'https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code=code&redirect_uri=https://thiepcuoiviet.net/freelance/fv0004/dist&client_id=7581d2bszc4sid&client_secret=oDYszogper1pau5d'
				.success (data, status, headers, config)->
					console.log data
				.error (data, status, headers, config)->
					$rootScope.error = data
					$state.go 'auth.SignIn'

		login: (username, password)->
			newUser = $wakanda.$ds.User.signUpNewUser "my@email.com", "myPassword"
			defer.resolve true
			defer.promise

		facebookLogin: ->
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

			getFacebookInformation = ->
				Facebook.api '/me', (response)->
					storeUser response
					newUser = $wakanda.$ds.User.signUpNewFBUser(response.id)
					console.log $state
					$state.go 'user.Profile'

			Facebook.getLoginStatus (response)->
				if response.status is 'connected' then $rootScope.loggedIn = true
				else $rootScope.loggedIn = false
				if $rootScope.loggedIn is false
					Facebook.login (response)->
						if response.status is 'connected' then $rootScope.loggedIn = true
						else $rootScope.loggedIn = false
						if $rootScope.loggedIn
							getFacebookInformation()
						else
							$rootScope.facebookLoginError = true
				else
					getFacebookInformation()

		checkPassword: (password)->
			defer.resolve true
			# $http
			# 	.post 'http://ec2-54-149-98-176.us-west-2.compute.amazonaws.com:8081/rest/$directory/login/', [username, password]
			# 	.success (data, status, headers, config)->
			# 		defer.resolve data
			# 	.error (data, status, headers, config)->
			# 		defer.resolve data
			defer.promise

		changePassword: (password)->
			defer.resolve 'done'
			# $http
			# 	.post 'http://ec2-54-149-98-176.us-west-2.compute.amazonaws.com:8081/rest/$directory/login/', [username, password]
			# 	.success (data, status, headers, config)->
			# 		defer.resolve data
			# 	.error (data, status, headers, config)->
			# 		defer.resolve data
			defer.promise
]

.factory 'User', [
	'$http'
	'$q'
	'$rootScope'
	'$state'
	($http, $q, $rootScope, $state)->
		defer = $q.defer()
		sendFeedback: (title, content)->
			defer.resolve true
			# $http
			# 	.post 'http://ec2-54-149-98-176.us-west-2.compute.amazonaws.com:8081/rest/$directory/login/', [username, password]
			# 	.success (data, status, headers, config)->
			# 		defer.resolve data
			# 	.error (data, status, headers, config)->
			# 		defer.resolve data
			defer.promise
]

.factory 'Assist', [
	'$http'
	'$q'
	($http, $q)->
		defer = $q.defer()
		localeToCountry: (locale)->
			$http
				.get 'scripts/vendors/FacebookLocales.json'
				.success (data, status, headers, config)->
					for item in data.locales.locale
						if item.codes.code.standard.representation is locale
							if item.englishName.split('(').length > 1
								defer.resolve item.englishName.split('(')[1].split(')')[0]
							else
								defer.resolve item.englishName
							break
				.error (data, status, headers, config)->
					defer.reject data
			defer.promise
		validateEmail: (email)->
			re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			return re.test(email)
]
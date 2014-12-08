'use strict';

angular.module('app.services', [])

.factory 'Auth', [
	'$http'
	'$q'
	'$rootScope'
	'$state'
	($http, $q, $rootScope, $state)->
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
]
'use strict';

angular.module('app.services', [])

.factory 'Auth', [
	'$http'
	'$rootScope'
	'$state'
	($http, $rootScope, $state)->
		verify: ->
			if localStorage.user_id is undefined
				$state.go 'auth.SignIn'
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
							defer.resolve item.englishName
							break
				.error (data, status, headers, config)->
					defer.reject data
			defer.promise
]
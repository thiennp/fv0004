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
				.post 'https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code=code&redirect_uri=http://localhost:9000&client_id=7581d2bszc4sid&client_secret=oDYszogper1pau5d'
				.success (data, status, headers, config)->
					console.log data
				.error (data, status, headers, config)->
					$rootScope.error = data
					$state.go 'auth.SignIn'
]
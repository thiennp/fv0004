'use strict';

angular.module('app.services', [])

.factory 'Auth', [
	'$state'
	($state)->
		verify: ->
			if localStorage.user_id is undefined
				$state.go 'auth.SignIn'
]
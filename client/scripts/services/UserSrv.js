'use strict';
kuvenoApp
	.factory('UserSrv', [
		'$http',
		'$q',
		'$rootScope',
		'$state',
		'Facebook',
		function ($http, $q, $rootScope, $state, Facebook) {
			var defer;
			return {
				sendFeedback: function (title, content) {
					defer = $q.defer();
					defer.resolve(true);
					return defer.promise;
				},
				getFacebookFollower: function (uid) {
					defer = $q.defer();
					Facebook.api('/uid', function (response) {
						defer.resolve(response);
					})
					return defer.promise;
				}
			};
		}
	]);
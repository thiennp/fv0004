'use strict';
kuvenoApp
	.factory('UserSrv', [
		'$http',
		'$q',
		'$rootScope',
		'$state',
		'Facebook',
		'LoggerSrv',
		'MandrillSrv',
		function ($http, $q, $rootScope, $state, Facebook, LoggerSrv, MandrillSrv) {
			var defer, to;
			return {
				sendFeedback: function (title, content) {
					defer = $q.defer();
					to = [
						/*{
						'name': 'Rasmus Nybergh',
						'email': 'rasmus.nybergh@gmail.com'
					}, */
						{
							'name': 'Thien Nguyen',
							'email': 'nguyenphongthien@yahoo.com'
						}
					];
					MandrillSrv
						.sendEmail($rootScope.user.name, $rootScope.user.email, to, title, content)
						.then(function (data) {
							defer.resolve(data);
						});
					return defer.promise;
				},
				sendEmail: function (to, cc, bcc, title, content) {
					defer = $q.defer();
					to = [
						// {
						// 	'name': 'Thien Nguyen',
						// 	'email': 'nguyenphongthien@yahoo.com'
						// }
					];
					MandrillSrv
						.sendEmail($rootScope.user.name, $rootScope.user.email, to, title, content)
						.then(function (data) {
							defer.resolve(data);
						});
					return defer.promise;
				},
				getFacebookFollower: function (uid) {
					defer = $q.defer();
					Facebook.api('/uid', function (response) {
						defer.resolve(response);
					});
					return defer.promise;
				}
			};
		}
	]);
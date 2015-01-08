'use strict';
kuvenoApp
	.factory('UserSrv', [
		'$http',
		'$q',
		'$rootScope',
		'$state',
		'Facebook',
		'MandrillSrv',
		function ($http, $q, $rootScope, $state, Facebook, MandrillSrv) {
			var defer;
			return {
				sendFeedback: function (title, content) {
					// defer = $q.defer();
					// var to = [{
					// 	'name': 'Thien Nguyen',
					// 	'email': 'nguyenphongthien@yahoo.com'
					// }];
					// MandrillSrv
					// 	.sendEmail('Thien', 'nguyenphongthien@gmail.com', to, 'Test send Mandrill email', '<div style="color:red">Test content</div>');
					// 	.then(function (data) {
					// 		defer.resolve(data);
					// 	});
					// return defer.promise;
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
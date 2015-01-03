'use strict';
kuvenoApp
	.factory('DataSrv', [
		'$http',
		'$q',
		'$wakanda',
		function ($http, $q, $wakanda) {
			return {
				getAllUsers: function () {
					var defer = $q.defer(),
						users = [],
						userCollection = $wakanda.$ds.User.$find();
					userCollection.$promise.then(function (data) {
						var i = 0;
						while (data.result[i]) {
							users.push(data.result[i]);
							i++;
						}
						defer.resolve(users);
					});
					return defer.promise;
				}
			};
		}
	]);
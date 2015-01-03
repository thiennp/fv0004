'use strict';
kuvenoApp
	.factory('DataSrv', [
		'$http',
		'$q',
		'$wakanda',
		function ($http, $q, $wakanda) {
			return {
				getData: function (collectionName, filter, params) {
					var defer = $q.defer(),
						list = [],
						collection = filter ? $wakanda.$ds[collectionName].$find({
							filter: filter,
							params: params
						}) : $wakanda.$ds[collectionName].$find();
					collection.$promise.then(function (data) {
						var i = 0;
						while (data.result[i]) {
							list.push(data.result[i]);
							i++;
						}
						defer.resolve(list);
					});
					return defer.promise;
				},
				fetchData: function (entity) {
					var defer = $q.defer();
					entity.$fetch().then(function (data) {
						defer.resolve(data);
					});
					return defer.promise;
				},
				createData: function (collectionName, object) {
					var defer = $q.defer();
					$wakanda.$ds[collectionName].$create(object).$save().then(function () {
						defer.resolve();
					});
					return defer.promise;
				}
			};
		}
	]);
'use strict';
kuvenoApp
	.controller('AppCtrl', [
		'$rootScope',
		'$scope',
		'$location',
		function ($rootScope, $scope, $location) {
			$scope.isSpecificPage = function () {
				var path;
				path = $location.path();
				return _.contains(['/auth/sign_up', '/auth/sign_in'], path);
			};
			if (localStorage.getItem('user_id')) {
				$rootScope.user = {
					'id': localStorage.getItem('user_id'),
					'first_name': localStorage.getItem('user_first_name'),
					'last_name': localStorage.getItem('user_last_name'),
					'link': localStorage.getItem('user_link'),
					'locale': localStorage.getItem('user_locale'),
					'name': localStorage.getItem('user_name'),
					'timezone': localStorage.getItem('user_timezone'),
					'updated_time': localStorage.getItem('user_updated_time'),
					'verified': localStorage.getItem('user_verified'),
					'avatar': localStorage.getItem('user_avatar'),
					'country': localStorage.getItem('user_country')
				};
			} else {
				$rootScope.user = {};
			}
			$scope.main = {
				brand: 'Kuveno',
			};
		}
	])
	.controller('NavCtrl', [
		'$scope',
		function ($scope) {}
	]);
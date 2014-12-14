'use strict';
kuvenoApp
	.controller('ProfileCtrl', [
		'$rootScope',
		'$scope',
		'AuthSrv',
		'UserSrv',
		function ($rootScope, $scope, AuthSrv, UserSrv) {
			AuthSrv.verify().then(function (data) {
				if (data) {
					UserSrv.getFacebookFollower($rootScope.user.facebook_id).then(function (data) {
						// Currently this function doesn't work because of facebook permission limit
						for (var key in data) {
							$rootScope.user[key] = data[key];
							// So you'll see error on this console log
							// console.log(key, ':');
							// console.log($rootScope.user[key]);
							// console.log('------------------------------------------------------------');
						}
					});
					if ($rootScope.onBack) {
						return $rootScope.onBack = false;
					} else {
						return $rootScope.$stateHistory.push('user.Profile');
					}
				}
			});
		}
	])
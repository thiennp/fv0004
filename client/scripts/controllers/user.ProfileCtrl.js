'use strict';
kuvenoApp
	.controller('ProfileCtrl', [
		'$rootScope',
		'AuthSrv',
		'UserSrv',
		function ($rootScope, AuthSrv, UserSrv) {
			AuthSrv.verify().then(function (data) {
				if (data) {
					if ($rootScope.onBack) {
						$rootScope.onBack = false;
					} else {
						$rootScope.$stateHistory.push('user.Profile');
					}
					UserSrv.getFacebookFollower($rootScope.me.facebook_id).then(function (data) {
						// Currently this function doesn't work because of facebook permission limit
						for (var key in data) {
							$rootScope.me[key] = data[key];
							// So you'll see error on this console log
							// console.log(key, ':');
							// console.log($rootScope.me[key]);
							// console.log('------------------------------------------------------------');
						}
					});
				}
			});
		}
	]);
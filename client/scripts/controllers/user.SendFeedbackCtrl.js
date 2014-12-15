'use strict';
kuvenoApp
	.controller('SendFeedbackCtrl', [
		'$rootScope',
		'$scope',
		'AuthSrv',
		'UserSrv',
		function ($rootScope, $scope, AuthSrv, UserSrv) {
			AuthSrv.verify().then(function (data) {
				if (data) {
					if ($rootScope.onBack) {
						$rootScope.onBack = false;
					} else {
						$rootScope.$stateHistory.push('user.SendFeedback');
					}
				}
			});
			$scope.sendFeedback = function () {
				UserSrv.sendFeedback($scope.title, $scope.content).then(function (data) {
					if (data) {
						$scope.success = true;
					} else {
						$scope.error = true;
					}
				});
			};
		}
	]);
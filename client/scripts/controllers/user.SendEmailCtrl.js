'use strict';
kuvenoApp
	.controller('SendEmailCtrl', [
		'$rootScope',
		'$scope',
		'AuthSrv',
		'DataSrv',
		'UserSrv',
		function ($rootScope, $scope, AuthSrv, DataSrv, UserSrv) {
			AuthSrv.verify().then(function (data) {
				if (data) {
					if ($rootScope.onBack) {
						$rootScope.onBack = false;
					} else {
						$rootScope.$stateHistory.push('user.SendEmail');
					}
					DataSrv.getData('User').then(function (result) {
						$rootScope.userWithEmail = [];
						for (var i in result) {
							if (result[i].email) {
								$rootScope.userWithEmail.push(result[i]);
							}
						}
						$rootScope.sendEmailTo = [];
						$rootScope.sendEmailCC = [];
						$rootScope.sendEmailBCC = [];
					});
				}
			});
			$scope.sendEmail = function () {
				UserSrv.sendEmail($scope.title, $scope.content).then(function (data) {
					if (data) {
						$scope.success = true;
					} else {
						$scope.error = true;
					}
				});
			};
		}
	]);
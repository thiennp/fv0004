'use strict';
kuvenoApp
	.controller('ChangePasswordCtrl', [
		'$q',
		'$rootScope',
		'$scope',
		'AuthSrv',
		function ($q, $rootScope, $scope, AuthSrv) {
			$scope.success = false;
			$scope.error = false;
			if ($rootScope.onBack) {
				$rootScope.onBack = false;
			} else {
				$rootScope.$stateHistory.push('user.ChangePassword');
			}
			$scope.unmatchedPassword = function () {
				if (changePasswordForm.newPassword.value != changePasswordForm.retypeNewPassword.value) {
					return true;
				} else {
					return false;
				}
			}
			$scope.changePassword = function () {
				AuthSrv.checkPassword(changePasswordForm.currentPassword.value).then(function (data) {
					if (data) {
						AuthSrv.changePassword(changePasswordForm.newPassword.value).then(function (data) {
							$scope.success = true;
							$scope.error = false;
						})
					} else {
						$scope.success = false;
						$scope.error = true;
					}
				});
			};
		}
	]);
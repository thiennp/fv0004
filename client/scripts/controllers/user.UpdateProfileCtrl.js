'use strict';
kuvenoApp
	.controller('UpdateProfileCtrl', [
		'$rootScope',
		'$scope',
		'AuthSrv',
		function ($scope, $rootScope, AuthSrv) {
			AuthSrv.verify().then(function (data) {
				if (data) {
					if ($rootScope.onBack) {
						$rootScope.onBack = false;
					} else {
						$rootScope.$stateHistory.push('user.ProfileUpdate');
					}
				}
			});
			$scope.updateProfile = function () {
				$rootScope.userCollection.$promise.then(function (user) {
					$rootScope.user.title = user.result[0].title = updateProfileForm.title.value;
					$rootScope.user.firstname = user.result[0].firstname = updateProfileForm.firstName.value;
					$rootScope.user.lastname = user.result[0].lastname = updateProfileForm.lastName.value;
					$rootScope.user.email = user.result[0].email = updateProfileForm.email.value;
					user.result[0].$save();
					localStorage.setItem('user_title', updateProfileForm.title.value);
					localStorage.setItem('user_firstname', updateProfileForm.firstName.value);
					localStorage.setItem('user_lastname', updateProfileForm.lastName.value);
					localStorage.setItem('user_email', updateProfileForm.email.value);
					$scope.success = true;
				});
			};
		}
	]);
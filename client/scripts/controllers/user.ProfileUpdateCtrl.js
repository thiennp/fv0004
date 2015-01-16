'use strict';
kuvenoApp
	.controller('ProfileUpdateCtrl', [
		'$rootScope',
		'$scope',
		'AuthSrv',
		'KuvenoUser',
		'LoggerSrv',
		function ($scope, $rootScope, AuthSrv, KuvenoUser, LoggerSrv) {
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
				KuvenoUser.upsert($rootScope.me).$promise
					.catch(function () {
						LoggerSrv.logError('Error updating profile');
					})
					.then(function () {
						$rootScope.me.title = updateProfileForm.title.value;
						$rootScope.me.firstname = updateProfileForm.firstName.value;
						$rootScope.me.lastname = updateProfileForm.lastName.value;
						$rootScope.me.email = updateProfileForm.email.value;
						localStorage.setItem('user_title', updateProfileForm.title.value);
						localStorage.setItem('user_firstname', updateProfileForm.firstName.value);
						localStorage.setItem('user_lastname', updateProfileForm.lastName.value);
						localStorage.setItem('user_email', updateProfileForm.email.value);
						$scope.success = true;
						LoggerSrv.logSuccess('Your profile has been updated successfully');
					});
			};
		}
	]);
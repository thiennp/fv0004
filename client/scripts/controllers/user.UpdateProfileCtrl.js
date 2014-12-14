'use strict';
kuvenoApp
	.controller('UpdateProfileCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'$wakanda',
		'AuthSrv',
		function ($scope, $rootScope, $state, $wakanda, AuthSrv) {
			AuthSrv.verify().then(function (data) {
				if (data) {
					if ($rootScope.onBack) {
						$rootScope.onBack = false;
					} else {
						$rootScope.$stateHistory.push('user.ProfileUpdate');
					}
					$scope.updateProfile = function () {
						var user = $wakanda.$ds.User.$findOne(localStorage.getItem('user_id'));
						user.$promise.then(function () {
							user.title = updateProfileForm.title.value;
							user.firstname = updateProfileForm.firstName.value;
							user.lastname = updateProfileForm.lastName.value;
							user.email = updateProfileForm.email.value;
							user.$save();
							$rootScope.user.title = user.title;
							$rootScope.user.firstname = user.firstname;
							$rootScope.user.lastname = user.lastname;
							$rootScope.user.email = user.email;
							localStorage.setItem('user_title', updateProfileForm.title.value);
							localStorage.setItem('user_firstname', updateProfileForm.firstName.value);
							localStorage.setItem('user_lastname', updateProfileForm.lastName.value);
							localStorage.setItem('user_email', updateProfileForm.email.value);
							$scope.success = true;
						})
					};
				}
			});
		}
	]);
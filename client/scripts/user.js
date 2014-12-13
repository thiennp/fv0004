'use strict';
angular

.module('app.user.controllers', [])

.controller('ProfileCtrl', [
	'$rootScope',
	'$scope',
	'Auth',
	'User',
	function ($rootScope, $scope, Auth, User) {
		Auth.verify().then(function (data) {
			if (data) {
				User.getFacebookFollower($rootScope.user.facebook_id).then(function (data) {
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

.controller('UpdateProfileCtrl', [
	'$rootScope',
	'$scope',
	'$state',
	'$wakanda',
	'Assist',
	'Auth',
	function ($scope, $rootScope, $state, $wakanda, Assist, Auth) {
		Auth.verify().then(function (data) {
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
])

.controller('SendFeedbackCtrl', [
	'$rootScope', '$scope', 'Auth', 'User',
	function ($rootScope, $scope, Auth, User) {
		Auth.verify().then(function (data) {
			if (data) {
				if ($rootScope.onBack) {
					return $rootScope.onBack = false;
				} else {
					return $rootScope.$stateHistory.push('user.SendFeedback');
				}
			}
		});
		return $scope.sendFeedback = function () {
			User.sendFeedback($scope.title, $scope.content).then(function (data) {
				if (data) {
					$scope.success = true;
				} else {
					$scope.error = true;
				}
			});
		};
	}
])

.controller('GroupsCtrl', [
	'$scope',
	function ($scope) {
		return console.log('Groups');
	}
])

.controller('MyTaskCtrl', [
	'$scope',
	function ($scope) {
		return console.log('My Task');
	}
])

.controller('UpCommingMeetingCtrl', [
	'$scope',
	function ($scope) {
		return console.log('Up Comming Meeting');
	}
])

.controller('ChangePasswordCtrl', [
	'$q', '$rootScope', '$scope', 'Auth',
	function ($q, $rootScope, $scope, Auth) {
		$scope.success = false;
		$scope.error = false;
		if ($rootScope.onBack) {
			$rootScope.onBack = false;
		} else {
			$rootScope.$stateHistory.push('auth.ChangePassword');
		}
		$scope.unmatchedPassword = function () {
			if (changePasswordForm.newPassword.value != changePasswordForm.retypeNewPassword.value) {
				return true;
			} else {
				return false;
			}
		}
		$scope.changePassword = function () {
			Auth.checkPassword(changePasswordForm.currentPassword.value).then(function (data) {
				if (data) {
					Auth.changePassword(changePasswordForm.newPassword.value).then(function (data) {
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
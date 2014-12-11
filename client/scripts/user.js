'use strict';
angular

.module('app.user.controllers', [])

.controller('ProfileCtrl', [
	'$rootScope', '$scope', 'Auth',
	function ($rootScope, $scope, Auth) {
		return Auth.verify().then(function (data) {
			if (data) {
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
				var user = $wakanda.$ds.User.$findOne(localStorage.getItem('user_id'));
				user.$promise.then(function () {
					updateProfileForm.title.value = user.title;
					updateProfileForm.firstName.value = user.firstname;
					updateProfileForm.lastName.value = user.lastname;
				})
				if ($rootScope.onBack) {
					$rootScope.onBack = false;
				} else {
					$rootScope.$stateHistory.push('user.UpdateProfile');
				}
				$scope.linkedinUpdate = function () {};
				$scope.facebookUpdate = function () {
					return Auth.facebookInfo();
				};
				$scope.updateProfile = function () {
					user.$promise.then(function () {
						user.title = updateProfileForm.title.value;
						user.firstname = updateProfileForm.firstName.value;
						user.lastname = updateProfileForm.lastName.value;
						user.$save();
					})
					localStorage.setItem('user_title', updateProfileForm.title.value);
					localStorage.setItem('user_first_name', updateProfileForm.firstName.value);
					localStorage.setItem('user_last_name', updateProfileForm.lastName.value);
					$state.go('user.Profile');
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
			if (!$scope.title) {
				$scope.error = true;
				$scope.errorMessage = 'Please enter feedback title';
				document.getElementById('title').focus();
				return $scope.titleError = true;
			} else {
				return User.sendFeedback($scope.title, $scope.content).then(function (data) {
					if (data) {
						$scope.error = false;
						$scope.success = true;
						$scope.titleError = false;
						$scope.title = '';
						return $scope.content = '';
					} else {
						$scope.error = true;
						$scope.errorMessage = 'Feedback can not be sent';
						return $scope.titleError = false;
					}
				});
			}
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
]);
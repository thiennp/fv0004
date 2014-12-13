'use strict';
angular

.module('app.controllers', [])

.controller('AppCtrl', [
	'$rootScope', '$scope', '$location',
	function ($rootScope, $scope, $location) {
		$scope.isSpecificPage = function () {
			var path;
			path = $location.path();
			return _.contains(['/auth/sign_up', '/auth/sign_in'], path);
		};
		if (localStorage.getItem('user_id')) {
			$rootScope.user = {
				'id': localStorage.getItem('user_id'),
				'first_name': localStorage.getItem('user_first_name'),
				'last_name': localStorage.getItem('user_last_name'),
				'link': localStorage.getItem('user_link'),
				'locale': localStorage.getItem('user_locale'),
				'name': localStorage.getItem('user_name'),
				'timezone': localStorage.getItem('user_timezone'),
				'updated_time': localStorage.getItem('user_updated_time'),
				'verified': localStorage.getItem('user_verified'),
				'avatar': localStorage.getItem('user_avatar'),
				'country': localStorage.getItem('user_country')
			};
		} else {
			$rootScope.user = {};
		}
		return $scope.main = {
			brand: 'Kuveno',
			name: $rootScope.user.name
		};
	}
])

.controller('NavCtrl', [
	'$scope', 'taskStorage', 'filterFilter',
	function ($scope, taskStorage, filterFilter) {
		var tasks;
		tasks = $scope.tasks = taskStorage.get();
		$scope.taskRemainingCount = filterFilter(tasks, {
			completed: false
		}).length;
		return $scope.$on('taskRemaining:changed', function (event, count) {
			return $scope.taskRemainingCount = count;
		});
	}
])

.controller('MainCtrl', [
	'$location', '$rootScope', '$scope', '$state', 'Auth', '$wakanda',
	function ($location, $rootScope, $scope, $state, Auth, $wakanda) {
		return Auth.verify().then(function (data) {
			var linkedinCode;
			if (data) {
				if ($rootScope.onBack) {
					$rootScope.onBack = false;
				} else {
					$rootScope.$stateHistory.push('main');
				}
				if ($location.$$absUrl.split('?code=').length > 1) {
					linkedinCode = $location.$$absUrl.split('?code=')[1].split('#/')[0];
					Auth.linkedin(linkedinCode);
				}
			}
			return Auth.login('amanda.aaron@tester.com', 'test');
		});
	}
])

.controller('CreateMeetingNoteCtrl', [
	'$scope',
	function ($scope) {
		if ($rootScope.onBack) {
			return $rootScope.onBack = false;
		} else {
			return $rootScope.$stateHistory.push('createMeetingNote');
		}
	}
]);
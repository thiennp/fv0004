'use strict';
kuvenoApp
	.controller('AppCtrl', [
		'$rootScope',
		'$scope',
		'$location',
		function ($rootScope, $scope, $location) {
			$scope.isSpecificPage = function () {
				var path;
				path = $location.path();
				return _.contains(['/auth/sign_up', '/auth/sign_in'], path);
			};
			if (localStorage.getItem('user_id')) {
				$rootScope.me = {
					'id': Number(localStorage.getItem('user_id')),
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
				$rootScope.me = {};
			}
			$scope.main = {
				brand: 'Kuveno',
			};
		}
	])
	.controller('NavCtrl', [
		'$scope',
		function ($scope) {}
	])
	.controller('HeaderCtrl', [
		'$scope',
		'AuthSrv',
		'LoggerSrv',
		'Meeting',
		'Task',
		function ($scope, AuthSrv, LoggerSrv, Meeting, Task) {
			return AuthSrv.verify().then(function (data) {
				$scope.comingMeetingList = [];
				$scope.taskList = [];
				$scope.meetingComing = 0;
				$scope.openTasks = 0;
				$scope.overdueTasks = 0;
				Meeting.findAll().$promise
					.catch(function () {
						LoggerSrv.logError('Error getting meeting data');
					})
					.then(function (result) {
						result.meetings.forEach(function (meeting) {
							if (moment().diff(meeting.meetingTime) < 0) {
								$scope.comingMeetingList.push(meeting);
								$scope.meetingComing++;
							}
						});
					});

				Task.findAll().$promise
					.catch(function () {
						LoggerSrv.logError('Error getting meeting data');
					})
					.then(function (result) {
						var taskListOverDue = [],
							taskListOpen = [];
						result.tasks.forEach(function (task) {
							if (!task.isCompleted) {
								$scope.openTasks++;
								if (task.dueDate) {
									if (moment().diff(task.dueDate) > 0) {
										$scope.overdueTasks++;
										taskListOverDue.push(task);
									} else {
										taskListOpen.push(task);
									}
								}
							}
						});
						if (taskListOverDue.length) {
							$scope.taskList = taskListOverDue;
						} else {
							$scope.taskList = taskListOpen;
						}
					});
			});
		}
	]);
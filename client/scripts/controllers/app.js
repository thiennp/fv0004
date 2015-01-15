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
		'DataSrv',
		function ($scope, AuthSrv, DataSrv) {
			return AuthSrv.verify().then(function (data) {
				$scope.comingMeetingList = [];
				$scope.taskList = [];
				$scope.meetingComing = 0;
				$scope.openTasks = 0;
				$scope.overdueTasks = 0;
				// DataSrv
				// 	.getData('Meeting')
				// 	.then(function (result) {
				// 		for (var i in result) {
				// 			if (moment().diff(result[i].meetingTime) < 0) {
				// 				$scope.comingMeetingList.push(result[i]);
				// 				$scope.meetingComing++;
				// 			}
				// 		}
				// 		console.log($scope.meetingComing);
				// 	});
				// DataSrv
				// 	.getData('Task')
				// 	.then(function (result) {
				// 		var taskListOverDue = [],
				// 			taskListOpen = [];
				// 		for (var i in result) {
				// 			if (!result[i].isCompleted) {
				// 				$scope.openTasks++;
				// 				if (result[i].dueDate) {
				// 					if (moment().diff(result[i].dueDate) > 0) {
				// 						$scope.overdueTasks++;
				// 						taskListOverDue.push(result[i]);
				// 					} else {
				// 						taskListOpen.push(result[i]);
				// 					}
				// 				}
				// 			}
				// 		}
				// 		if (taskListOverDue.length) {
				// 			if (taskListOverDue.length > 3) {
				// 				$scope.taskList.push(taskListOverDue[0]);
				// 				$scope.taskList.push(taskListOverDue[1]);
				// 				$scope.taskList.push(taskListOverDue[2]);
				// 			} else {
				// 				$scope.taskList = taskListOverDue;
				// 			}
				// 		} else {
				// 			if (taskListOpen.length > 3) {
				// 				$scope.taskList.push(taskListOpen[0]);
				// 				$scope.taskList.push(taskListOpen[1]);
				// 				$scope.taskList.push(taskListOpen[2]);
				// 			} else {
				// 				$scope.taskList = taskListOpen;
				// 			}
				// 		}
				// 	});
			});
		}
	]);
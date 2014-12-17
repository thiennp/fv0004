'use strict';
kuvenoApp
	.controller('MyTasksCtrl', [
		'$location',
		'$rootScope',
		'$scope',
		'$state',
		'$wakanda',
		'AuthSrv',
		'MainSrv',
		'LoggerSrv',
		function ($location, $rootScope, $scope, $state, $wakanda, AuthSrv, MainSrv, LoggerSrv) {
			AuthSrv.verify().then(function (data) {
				var linkedinCode;
				if (data) {
					if ($rootScope.onBack) {
						$rootScope.onBack = false;
					} else {
						$rootScope.$stateHistory.push('main.MyTasks');
					}
					if ($location.$$absUrl.split('?code=').length > 1) {
						linkedinCode = $location.$$absUrl.split('?code=')[1].split('#/')[0];
						AuthSrv.linkedin(linkedinCode);
					}
				}
			});
			var tasks;
			tasks = $scope.tasks = MainSrv.get();
			$scope.newTask = '';

			// $scope.remainingCount = filterFilter(tasks, {
			// 	completed: false
			// }).length;
			$scope.remainingCount = 10;

			$scope.editedTask = null;

			$scope.statusFilter = {
				completed: false
			};

			$scope.filter = function (filter) {
				switch (filter) {
				case 'all':
					$scope.statusFilter = '';
					break;
				case 'active':
					$scope.statusFilter = {
						completed: false
					};
					break;
				case 'completed':
					$scope.statusFilter = {
						completed: true
					};
					break;
				}
			};

			$scope.add = function () {
				var newTask;
				newTask = $scope.newTask.trim();
				if (newTask.length === 0) {
					return;
				}
				tasks.push({
					title: newTask,
					completed: false
				});
				LoggerSrv.logSuccess('New task: "' + newTask + '" added');
				MainSrv.put(tasks);
				$scope.newTask = '';
				return $scope.remainingCount++;
			};

			$scope.edit = function (task) {
				$scope.editedTask = task;
			};

			$scope.doneEditing = function (task) {
				$scope.editedTask = null;
				task.title = task.title.trim();
				if (!task.title) {
					$scope.remove(task);
				} else {
					LoggerSrv.log('Task updated');
				}
				return MainSrv.put(tasks);
			};

			$scope.remove = function (task) {
				var index;
				$scope.remainingCount -= task.completed ? 0 : 1;
				index = $scope.tasks.indexOf(task);
				$scope.tasks.splice(index, 1);
				MainSrv.put(tasks);
				return LoggerSrv.logError('Task removed');
			};

			$scope.completed = function (task) {
				$scope.remainingCount += task.completed ? -1 : 1;
				MainSrv.put(tasks);
				if (task.completed) {
					if ($scope.remainingCount > 0) {
						if ($scope.remainingCount === 1) {
							return LoggerSrv.log('Almost there! Only ' + $scope.remainingCount + ' task left');
						} else {
							return LoggerSrv.log('Good job! Only ' + $scope.remainingCount + ' tasks left');
						}
					} else {
						return LoggerSrv.logSuccess('Congrats! All done :)');
					}
				}
			};

			$scope.clearCompleted = function () {
				$scope.tasks = tasks = tasks.filter(function (val) {
					return !val.completed;
				});
				return MainSrv.put(tasks);
			};

			$scope.markAll = function (completed) {
				tasks.forEach(function (task) {
					task.completed = completed;
				});
				$scope.remainingCount = completed ? 0 : tasks.length;
				MainSrv.put(tasks);
				if (completed) {
					LoggerSrv.logSuccess('Congrats! All done :)');
				}
			};

			$scope.$watch('remainingCount == 0', function (val) {
				$scope.allChecked = val;
			});

			$scope.$watch('remainingCount', function (newVal, oldVal) {
				$rootScope.$broadcast('taskRemaining:changed', newVal);
			});

		}
	]);
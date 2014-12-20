'use strict';
kuvenoApp
	.controller('MyTasksCtrl', [
		'$location',
		'$rootScope',
		'$scope',
		'$state',
		'$wakanda',
		'AssistSrv',
		'AuthSrv',
		'MainSrv',
		'LoggerSrv',
		function ($location, $rootScope, $scope, $state, $wakanda, AssistSrv, AuthSrv, MainSrv, LoggerSrv) {
			return AuthSrv.verify().then(function (data) {
				var linkedinCode;
				$scope.overdueTasks = 0;
				$scope.openTasks = 0;
				$scope.closedTasks = 0;
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
				if (localStorage.getItem('myTasks_sortType')) {
					$scope.sortType = localStorage.getItem('myTasks_sortType');
				} else {
					$scope.sortType = 'dueTime';
				}
				if (localStorage.getItem('myTasks_sortReverse')) {
					$scope.reverse = localStorage.getItem('myTasks_sortReverse');
				} else {
					$scope.reverse = false;
				}
				var tasks;
				$wakanda.$ds.Task.$find().$promise.then(function (data) {
					tasks = $scope.tasks = [];
					var i = 0;
					while (data.result[i]) {
						var dueDate = new Date(data.result[i].dueDate);
						var now = new Date();
						data.result[i].dueTime = dueDate.valueOf() - now.valueOf();

						if (data.result[i].dueTime < 0) {
							if (data.result[i].isCompleted) {
								data.result[i].overdue = false;
								$scope.closedTasks++;
							} else {
								data.result[i].overdue = true;
								$scope.openTasks++;
								$scope.overdueTasks++;
							}
						} else {
							data.result[i].overdue = false;

							if (data.result[i].isCompleted) {
								$scope.closedTasks++;
							} else {
								$scope.openTasks++;
							}
						}
						data.result[i].dueTimeString = AssistSrv.timeToString(data.result[i].dueTime);
						$scope.tasks.push(data.result[i]);
						i++;
					}
				});
				$scope.newTask = '';

				$scope.remainingCount = 0;

				$scope.editedTask = null;

				$scope.statusFilter = {
					isCompleted: false
				};

				$scope.sort = function (sortType) {
					if ($scope.sortType !== sortType) {
						$scope.reverse = false;
						$scope.sortType = sortType;
					} else {
						$scope.reverse = !$scope.reverse;
					}
					localStorage.setItem('myTasks_sortType', sortType);
					localStorage.setItem('myTasks_sortReverse', $scope.reverse);
				};

				$scope.filter = function (filter) {
					switch (filter) {
					case 'all':
						$scope.statusFilter = '';
						break;
					case 'active':
						$scope.statusFilter = {
							isCompleted: false
						};
						break;
					case 'isCompleted':
						$scope.statusFilter = {
							isCompleted: true
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
						description: newTask,
						isCompleted: false
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
					task.description = task.description.trim();
					if (!task.description) {
						$scope.remove(task);
					} else {
						LoggerSrv.log('Task updated');
					}
					task.$save();
					console.log(task);
				};

				$scope.remove = function (task) {
					var index;
					$scope.remainingCount -= task.isCompleted ? 0 : 1;
					index = $scope.tasks.indexOf(task);
					$scope.tasks.splice(index, 1);
					MainSrv.put(tasks);
					return LoggerSrv.logError('Task removed');
				};

				$scope.completed = function (task) {
					$scope.remainingCount += task.isCompleted ? -1 : 1;
					MainSrv.put(tasks);
					if (task.isCompleted) {
						if ($scope.remainingCount > 0) {
							if ($scope.remainingCount === 1) {
								LoggerSrv.log('Almost there! Only ' + $scope.remainingCount + ' task left');
							} else {
								LoggerSrv.log('Good job! Only ' + $scope.remainingCount + ' tasks left');
							}
						} else {
							LoggerSrv.logSuccess('Congrats! All done :)');
						}
					}
				};

				$scope.clearCompleted = function () {
					$scope.tasks = tasks = tasks.filter(function (val) {
						return !val.isCompleted;
					});
					// MainSrv.put(tasks);
				};

				$scope.markAll = function (isCompleted) {
					tasks.forEach(function (task) {
						task.isCompleted = isCompleted;
						task.$save();
					});
					$scope.remainingCount = isCompleted ? 0 : tasks.length;
					if (isCompleted) {
						LoggerSrv.logSuccess('Congrats! All done :)');
					}
				};

				$scope.$watch('remainingCount == 0', function (val) {
					$scope.allChecked = val;
				});

				$scope.$watch('remainingCount', function (newVal, oldVal) {
					$rootScope.$broadcast('taskRemaining:changed', newVal);
				});
			});
		}
	]);
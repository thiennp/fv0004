'use strict';
kuvenoApp
	.controller('MyTasksCtrl', [
		'$rootScope',
		'$scope',
		'AuthSrv',
		'KuvenoUser',
		'LoggerSrv',
		'Task',
		function ($rootScope, $scope, AuthSrv, KuvenoUser, LoggerSrv, Task) {
			return AuthSrv.verify().then(function (data) {
				var myId = $rootScope.me.id,
					resetNewTask = function () {
						$scope.newTask = {
							description: '',
							assignedBy: myId,
							owner: myId,
							dueDate: new Date()
						};
					},

					loadTasks = function () {
						Task.findAll().$promise.then(function (result) {
							$scope.tasks = result.tasks;
							totalCalculate(true);
						});
					},

					totalCalculate = function (user) {
						$scope.openTasks = 0;
						$scope.closedTasks = 0;
						$scope.overdueTasks = 0;
						$scope.tasks.forEach(function (task) {
							var dateCalculation = $scope.currentDueDate(task);
							$scope.closedTasks += dateCalculation.closed;
							$scope.openTasks += dateCalculation.open;
							$scope.overdueTasks += dateCalculation.overdue;
						});
					};

				if (data) {
					if ($rootScope.onBack) {
						$rootScope.onBack = false;
					} else {
						$rootScope.$stateHistory.push('main.MyTasks');
					}
				}

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
					$scope.newTask.description = $scope.newTask.description.trim();
					if ($scope.newTask.description.length === 0) {
						LoggerSrv.logError('Please input description.');
						return;
					}
					if (!$scope.newTask.owner) {
						LoggerSrv.logError('Please select assigned user.');
						return;
					}

					var task = {
						description: $scope.newTask.description,
						dueDate: $scope.newTask.dueDate,
						assignedBy: myId,
						owner: $scope.newTask.owner,
						isCompleted: false
					};

					Task.create(task).$promise
						.catch(function () {
							LoggerSrv.logError('Saving task: "' + task.description + '" failed.');
						})
						.then(function () {
							$scope.tasks.push(task);
							totalCalculate($scope.tasks);
							LoggerSrv.logSuccess('New task: "' + task.description + '" added');
							resetNewTask();
							$scope.openTasks++;
						});
				};

				$scope.edit = function (task) {
					$scope.editedTask = task;
				};

				$scope.doneEditing = function (task) {
					$scope.editedTask = null;
					task.description = task.description.trim();
					task.assignedBy = myId;
					if (!task.description) {
						$scope.remove(task);
						Task.removeById(task.id).$promise
							.catch(function () {
								LoggerSrv.logError('Error removing task');
							})
							.then(function () {
								LoggerSrv.logError('Task removed');
							});
					} else {
						Task.upsert(task).$promise
							.catch(function () {
								LoggerSrv.logError('Error updating task');
							})
							.then(function () {
								totalCalculate($scope.tasks);
								LoggerSrv.logSuccess('Task updated');
							});
					}
				};

				$scope.remove = function (task) {
					var index;
					$scope.openTasks -= task.isCompleted ? 0 : 1;
					$scope.closedTasks -= task.isCompleted ? 1 : 0;
					index = $scope.tasks.indexOf(task);
					$scope.tasks.splice(index, 1);
					Task.removeById(task.id).$promise
						.catch(function () {
							LoggerSrv.logError('Error removing task');
						})
						.then(function () {
							LoggerSrv.logError('Task removed');
						});
				};

				$scope.completed = function (task) {
					task.isCompleted = !task.isCompleted;
					$scope.openTasks += task.isCompleted ? -1 : 1;
					$scope.closedTasks += task.isCompleted ? 1 : -1;
					if (task.isCompleted) {
						if ($scope.openTasks > 0) {
							if ($scope.openTasks === 1) {
								LoggerSrv.log('Almost there! Only ' + $scope.openTasks + ' task left');
							} else {
								LoggerSrv.log('Good job! Only ' + $scope.openTasks + ' tasks left');
							}
						} else {
							LoggerSrv.logSuccess('Congrats! All done :)');
						}
					}
					Task.upsert(task).$promise
						.catch(function () {
							LoggerSrv.logError('Error saving task');
						})
						.then(function () {
							totalCalculate($scope.tasks);
						});
				};

				$scope.markAll = function (isCompleted) {
					$scope.tasks.forEach(function (task) {
						task.isCompleted = isCompleted;
						Task.upsert(task).$promise
							.catch(function () {
								LoggerSrv.logError('Error updating task');
							})
							.then(function () {
								totalCalculate($scope.tasks);
								LoggerSrv.logSuccess('Task updated');
							});
						totalCalculate($scope.tasks);
					});
					$scope.openTasks = isCompleted ? 0 : $scope.tasks.length;
					$scope.closedTasks = isCompleted ? $scope.tasks.length : 0;
					if (isCompleted) {
						LoggerSrv.logSuccess('Congrats! All done :)');
					}
				};

				$scope.currentDueDate = function (task) {
					var closed = 0;
					var open = 0;
					var overdue = 0;
					if (moment().diff(task.dueDate) > 0) {
						if (task.isCompleted) {
							task.overdue = false;
							closed = 1;
						} else {
							task.overdue = true;
							open = 1;
							overdue = 1;
						}
					} else {
						task.overdue = false;
						if (task.isCompleted) {
							closed = 1;
						} else {
							open = 1;
						}
					}
					return {
						'closed': closed,
						'open': open,
						'overdue': overdue
					};
				};

				$scope.overdueTasks = 0;
				$scope.openTasks = 0;
				$scope.closedTasks = 0;
				$scope.users = [];
				$scope.usersById = [];
				$scope.editedTask = null;
				$scope.statusFilter = {
					isCompleted: false
				};
				resetNewTask();

				// Load remembered task sorting status
				if (localStorage.getItem('myTasks_sortType')) {
					$scope.sortType = localStorage.getItem('myTasks_sortType');
				} else {
					$scope.sortType = 'dueDate';
				}
				if (localStorage.getItem('myTasks_sortReverse')) {
					$scope.reverse = localStorage.getItem('myTasks_sortReverse');
				} else {
					$scope.reverse = false;
				}

				KuvenoUser.findAll().$promise.then(function (result) {
					$scope.users = result.users;
					$scope.users.forEach(function (user) {
						$scope.usersById[user.id] = user;
					});
					loadTasks();
				});

				$scope.$watch('openTasks == 0', function (val) {
					$scope.allChecked = val;
				});

				$scope.$watch('openTasks', function (newVal, oldVal) {
					$rootScope.$broadcast('taskRemaining:changed', newVal);
				});
			});
		}
	]);
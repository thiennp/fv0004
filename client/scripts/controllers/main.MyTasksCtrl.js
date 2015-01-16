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
				if (data) {
					if ($rootScope.onBack) {
						$rootScope.onBack = false;
					} else {
						$rootScope.$stateHistory.push('main.MyTasks');
					}
				}
				$scope.overdueTasks = 0;
				$scope.openTasks = 0;
				$scope.closedTasks = 0;
				$scope.users = [];
				$scope.newTask = {
					description: '',
					assignedBy: $rootScope.currentUser,
					owner: $rootScope.currentUser,
					dueDate: new Date()
				};
				$scope.editedTask = null;
				$scope.statusFilter = {
					isCompleted: false
				};
				var tasks, loadAllUsers, loadTasks, getUser, totalCalculate, getUserById, newTask = {
					description: '',
					assignedBy: $rootScope.currentUser,
					owner: $rootScope.currentUser,
					dueDate: new Date()
				};

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

				loadTasks = function () {
					Task.findAll().$promise.then(function (result) {
						$scope.tasks = result.tasks;
						console.log($scope.tasks);
						totalCalculate(true);
					});
				};

				totalCalculate = function (user) {
					$scope.openTasks = 0;
					$scope.closedTasks = 0;
					$scope.overdueTasks = 0;
					for (var i in $scope.tasks) {
						var dateCalculation = $scope.currentDueDate($scope.tasks[i]);
						$scope.closedTasks += dateCalculation.closed;
						$scope.openTasks += dateCalculation.open;
						$scope.overdueTasks += dateCalculation.overdue;
						if (user) {
							getUser($scope.tasks[i]);
						}
					}
				};

				// Inject owner firstname and owner id to task
				getUser = function (task) {
					for (var i in $scope.users) {
						if (task.owner === $scope.users[i].id) {
							task.ownerUser = $scope.users[i].firstname;
							task.ownerUserValue = $scope.users[i].id;
						}
					}
				};

				// Get an user entity which is indicated by userId
				getUserById = function (userId) {
					for (var id in $scope.users) {
						if ($scope.users[id].id === userId) {
							return $scope.users[id];
						}
					}
				};

				KuvenoUser.findAll().$promise.then(function (result) {
					$scope.users = result.users;
					loadTasks();
				});

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
					newTask.description = $scope.newTask.description.trim();
					if (newTask.description.length === 0) {
						LoggerSrv.logError('Please input description.');
						return;
					}
					if (!$scope.newTask.ownerUserValue) {
						LoggerSrv.logError('Please select assigned user.');
						return;
					}

					// Get owner entity by owner id (chosen by select box)
					var owner = getUserById($scope.newTask.ownerUserValue);
					var task = {
						description: $scope.newTask.description,
						dueDate: $scope.newTask.dueDate,
						assignedBy: $rootScope.currentUser,
						owner: owner,
						isCompleted: false
					};

					// DataSrv
					// 	.createData('Task', task)
					// 	.then(function () {
					// 		task.ownerUser = owner.firstname;
					// 		task.ownerUserValue = $scope.newTask.ownerUserValue;
					// 		tasks.push(task);
					// 		totalCalculate($scope.tasks);
					// 		LoggerSrv.logSuccess('New task: "' + newTask.description + '" added');
					// 		$scope.newTask = {
					// 			description: '',
					// 			assignedBy: $rootScope.currentUser,
					// 			owner: $rootScope.currentUser,
					// 			dueDate: new Date()
					// 		};
					// 		$scope.openTasks++;
					// 	}, function () {
					// 		LoggerSrv.logError('Saving task: "' + newTask.description + '" failed.');
					// 	});
				};

				$scope.edit = function (task) {
					$scope.editedTask = task;
				};

				$scope.doneEditing = function (task) {
					$scope.editedTask = null;
					task.description = task.description.trim();
					task.owner = getUserById(task.ownerUserValue);
					task.ownerUser = task.owner.firstname;
					task.ownerUserValue = task.owner.ID;
					task.assignedBy = $rootScope.currentUser;
					if (!task.description) {
						$scope.remove(task);
						task.$remove();
					} else {
						task.$save();
						totalCalculate($scope.tasks);
						LoggerSrv.log('Task updated');
					}
				};

				$scope.remove = function (task) {
					var index;
					$scope.openTasks -= task.isCompleted ? 0 : 1;
					$scope.closedTasks -= task.isCompleted ? 1 : 0;
					index = $scope.tasks.indexOf(task);
					$scope.tasks.splice(index, 1);
					task.$remove();
					LoggerSrv.logError('Task removed');
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
					Task.save(task).$promise.then(function (data) {
						totalCalculate($scope.tasks);
					});
				};

				$scope.markAll = function (isCompleted) {
					tasks.forEach(function (task) {
						task.isCompleted = isCompleted;
						task.$save();
						totalCalculate($scope.tasks);
					});
					$scope.openTasks = isCompleted ? 0 : tasks.length;
					$scope.closedTasks = isCompleted ? tasks.length : 0;
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

				$scope.$watch('openTasks == 0', function (val) {
					$scope.allChecked = val;
				});

				$scope.$watch('openTasks', function (newVal, oldVal) {
					$rootScope.$broadcast('taskRemaining:changed', newVal);
				});
			});
		}
	]);
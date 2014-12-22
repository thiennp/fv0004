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
				$scope.overdueTasks = 0;
				$scope.openTasks = 0;
				$scope.closedTasks = 0;
				$scope.overdueTasks = 0;
				$scope.users = [];
				$scope.newTask = {
					description: '',
					assignedBy: '',
					dueDate: new Date()
				};
				$scope.editedTask = null;
				$scope.statusFilter = {
					isCompleted: false
				};
				var linkedinCode, tasks, loadUsers, loadTasks, getUser, totalCalculate, getUserById, newTask = {
					description: '',
					assignedBy: '',
					dueDate: new Date()
				};
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

				loadUsers = function () {
					$wakanda.$ds.User.$find().$promise.then(function (data) {
						var i = 0;
						while (data.result[i]) {
							$scope.users.push(data.result[i]);
							i++;
						}
						loadTasks();
					});
				};

				loadTasks = function () {
					$wakanda.$ds.Task.$find().$promise.then(function (data) {
						totalCalculate(data.result, true);
					});
				};

				totalCalculate = function (data, user) {
					tasks = $scope.tasks = [];
					$scope.openTasks = 0;
					$scope.closedTasks = 0;
					$scope.overdueTasks = 0;
					var i = 0;
					while (data[i]) {
						var dateCalculation = $scope.currentDueDate(data[i]);
						$scope.closedTasks += dateCalculation.closed;
						$scope.openTasks += dateCalculation.open;
						$scope.overdueTasks += dateCalculation.overdue;
						$scope.tasks.push(data[i]);
						if (user) {
							getUser(data[i]);
						}
						i++;
					}
				};

				getUser = function (task) {
					var assignedBy = task.assignedBy.$fetch();
					assignedBy.then(function (data) {
						task.assignedByUser = data.firstname;
						task.assignedByUserValue = data.ID;
					});
				};

				getUserById = function (userId) {
					for (var id in $scope.users) {
						if ($scope.users[id].ID === userId) {
							return $scope.users[id];
						}
					}
				};

				loadUsers();

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
						return;
					}

                    // @todo: Change AuthSrv, so that the current user is saved in a variable, not in an array.
					var assignedUser = $rootScope.userCollection[0];

                    //
                    // You had not set task.owner, so the task would not be saved. I changed this. RN
                    //
                    var owner = getUserById($scope.newTask.assignedByUserValue);
					var task = {
                        description: $scope.newTask.description,
						dueDate: $scope.newTask.dueDate,
						assignedBy : assignedUser,
                        owner : owner,
						isCompleted: false
					};
					console.log(task);

					var wakTask = $wakanda.$ds.Task.$create(task);
                    var taskPromise = wakTask.$save();
                    taskPromise.then(function() {
                        task.assignedByUser = assignedUser.firstname;
                        task.assignedByUserValue = $scope.newTask.assignedByUserValue;
                        tasks.push(task);
                        totalCalculate($scope.tasks);
                        LoggerSrv.logSuccess('New task: "' + newTask.description + '" added');
                        $scope.newTask = {
                            description: '',
                            assignedBy: '',
                            dueDate: new Date()
                        };
                        $scope.openTasks++;
                    }, function() {
                        LoggerSrv.logError('Saving task: "' + newTask.description + '" failed.');
                    });
				};

				$scope.edit = function (task) {
					$scope.editedTask = task;
				};

				$scope.doneEditing = function (task) {
					$scope.editedTask = null;
					task.description = task.description.trim();
					task.assignedBy = getUserById(task.assignedByUserValue);
					task.assignedByUser = task.assignedBy.firstname;
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
					task.$save();
					totalCalculate($scope.tasks);
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
					var dueDate = new Date(task.dueDate);
					var now = new Date();
					task.dueTime = dueDate.valueOf() - now.valueOf();
					var closed = 0;
					var open = 0;
					var overdue = 0;
					if (task.dueTime < 0) {
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
					task.dueTimeString = AssistSrv.timeToString(task.dueTime);
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

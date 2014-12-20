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
				$scope.openTasks = 0;
				$scope.users = [];
				$scope.newTask = '';
				$scope.editedTask = null;
				$scope.statusFilter = {
					isCompleted: false
				};
				var linkedinCode, tasks, loadUsers, loadTasks, getUser;
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
							getUser(data.result[i]);
							i++;
						}
						$scope.openTasks = $scope.openTasks;
					});
				};

				getUser = function (task) {
					var assignedBy = task.assignedBy.$fetch();
					var owner = task.owner.$fetch();
					assignedBy.then(function (data) {
						task.assignedByUser = data;
						task.assignedByUserValue = data.firstname;
					});
					owner.then(function (data) {
						task.ownerUser = data;
					});
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
					var newTask = $scope.newTask.trim();
					if (newTask.length === 0) {
						return;
					}
					var task = {
						description: newTask,
						isCompleted: false
					};
					tasks.push(task);
					$wakanda.$ds.Task.$create(task).$save();
					LoggerSrv.logSuccess('New task: "' + newTask + '" added');
					$scope.newTask = '';
					$scope.openTasks++;
				};

				$scope.edit = function (task) {
					$scope.editedTask = task;
				};

				$scope.doneEditing = function (task) {
					$scope.editedTask = null;
					task.description = task.description.trim();
					console.log(task);
					if (!task.description) {
						$scope.remove(task);
						task.$remove();
					} else {
						LoggerSrv.log('Task updated');
					}
					task.$save();
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
				};

				$scope.markAll = function (isCompleted) {
					tasks.forEach(function (task) {
						task.isCompleted = isCompleted;
						task.$save();
					});
					$scope.openTasks = isCompleted ? 0 : tasks.length;
					$scope.closedTasks = isCompleted ? tasks.length : 0;
					if (isCompleted) {
						LoggerSrv.logSuccess('Congrats! All done :)');
					}
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
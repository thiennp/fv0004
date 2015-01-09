'use strict';
kuvenoApp
	.controller('ViewOneMeetingCtrl', [
		'$modal',
		'$rootScope',
		'$scope',
		'$stateParams',
		'$timeout',
		'AuthSrv',
		'DataSrv',
		'LoggerSrv',
		function ($modal, $rootScope, $scope, $stateParams, $timeout, AuthSrv, DataSrv, LoggerSrv) {
			return AuthSrv.verify().then(function (data) {
				$scope.pdf = null;
				$scope.editorOptions = {
					language: 'en',
					uiColor: '#000000'
				};
				$rootScope.textAreaList = [
					'<textarea class="tinymce" ui-tinymce show-task="true" show-decision="true" show-mention="true" ng-model="meeting.agenda.content" task-modal="tinyMCETask" task-controller="ModalCtrl" style="height: 300px"></textarea>',
					'<textarea class="tinymce" ui-tinymce show-task="true" show-decision="true" show-mention="true" ng-model="meeting.notes.content" task-modal="tinyMCETask" task-controller="ModalCtrl"  style="height: 300px"></textarea>'
				];
				if (data) {
					if ($rootScope.onBack) {
						$rootScope.onBack = false;
					} else {
						$rootScope.$stateHistory.push('main.ViewOneMeeting');
					}
				}
				DataSrv.getData('User').then(function (result) {
					$scope.users = result;
				});
				// Inject owner firstname and owner id to task
				var getUser = function (task) {
						DataSrv.fetchData(task.owner).then(function (result) {
							task.ownerUser = result.firstname;
							task.ownerUserValue = result.ID;
						});
					},
					// Get an user entity which is indicated by userId
					getUserById = function (userId) {
						for (var id in $scope.users) {
							if ($scope.users[id].ID === userId) {
								return $scope.users[id];
							}
						}
					},
					// Return task id if task exist, else return undefined
					checkExistTask = function (task) {
						var returnTask = false;
						for (var i in $scope.meeting.tasks) {
							if (task.ID) {
								if (task.ID === $scope.meeting.tasks[i].ID) {
									returnTask = $scope.meeting.tasks[i];
									break;
								}
							} else {
								if (task.owner.ID === $scope.meeting.tasks[i].owner.ID && task.description === $scope.meeting.tasks[i].description && task.dueDate === $scope.meeting.tasks[i].dueDate) {
									returnTask = $scope.meeting.tasks[i];
									break;
								}
							}
						}
						return returnTask;
					},
					// Return decision id if decision exist, else return undefined
					checkExistDecision = function (decision) {
						var returnDescription = false;
						for (var i in $scope.meeting.decisions) {
							if (decision.ID) {
								if (decision.ID === $scope.meeting.decisions[i].ID) {
									returnDescription = $scope.meeting.decisions[i];
									break;
								}
							} else {
								if (decision.description === $scope.meeting.decisions[i].description) {
									returnDescription = $scope.meeting.decisions[i];
									break;
								}
							}
						}
						return returnDescription;
					},
					// Create a task object from a jquery element information
					makeTask = function (element) {
						var task = {
							description: element.find('.task-description').html(),
							dueDate: element.find('.task-duedate').html(),
							assignedBy: $rootScope.currentUser,
							isCompleted: false
						};
						var taskId = element.attr('task-id');
						if (typeof taskId !== typeof undefined && taskId !== false) {
							task.ID = taskId;
						}
						for (var i in $scope.users) {
							if (element.find('.task-owner').attr('data-id') === $scope.users[i].ID) {
								task.owner = $scope.users[i];
								break;
							}
						}
						return task;
					},
					// Create a decision object from a jquery element information
					makeDecision = function (element) {
						var decision = {
							description: element.find('.decision-description').html()
						};
						var decisionId = element.attr('decision-id');
						if (typeof decisionId !== typeof undefined && decisionId !== false) {
							decision.ID = decisionId;
						}
						return decision;
					},
					// Add task-id for all element which match with a task
					matchTask = function (object) {
						$(object.content).each(function () {
							if ($(this).find('.task-description').html()) {
								var task = makeTask($(this));
								var matched = checkExistTask(task);
								if (matched) {
									$(this).attr('task-id', matched.ID);
								}
							}
						});
					},
					// Add decision-id for all element which match with a decision
					matchDecision = function (object) {
						$(object.content).each(function () {
							if ($(this).find('.decision-description').html()) {
								var decision = makeDecision($(this));
								var matched = checkExistDecision(decision);
								if (matched) {
									$(this).attr('decision-id', matched.ID);
								}
							}
						});
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
						LoggerSrv.log('Task updated');
					}
				};
				// Remove a task
				$scope.remove = function (task) {
					var index;
					index = $scope.meeting.tasks.indexOf(task);
					$scope.meeting.tasks.splice(index, 1);
					task.$remove();
					LoggerSrv.logError('Task removed');
				};
				// Mark a task as completed
				$scope.completed = function (task) {
					task.isCompleted = !task.isCompleted;
					if (moment().diff(task.dueDate) > 0) {
						if (task.isCompleted) {
							task.overdue = false;
						} else {
							task.overdue = true;
						}
					} else {
						task.overdue = false;
					}
					task.$save();
					LoggerSrv.log('Task updated');
				};
				$scope.sendAgenda = function () {
					$scope.CCshown = false;
					$scope.BCCshown = false;
					$modal.open({
						templateUrl: 'sendAgenda',
						controller: 'ModalCtrl'
					});
				};
				$scope.sendNotes = function () {
					$scope.CCshown = false;
					$scope.BCCshown = false;
					$modal.open({
						templateUrl: 'sendNotes',
						controller: 'ModalCtrl'
					});
				};
				$scope.sendReminders = function () {
					$scope.CCshown = false;
					$scope.BCCshown = false;
					$modal.open({
						templateUrl: 'sendReminders',
						controller: 'ModalCtrl'
					});
				};
				$scope.editAgenda = function () {
					$scope.agendaEditedContent = $scope.meeting.agenda.content;
					$scope.agendaEdit = true;
				};
				$scope.cancelAgenda = function () {
					$scope.meeting.agenda.content = $scope.agendaEditedContent;
					$scope.agendaEdit = false;
				};
				// Submit agenda changes
				$scope.applyAgenda = function () {
					$($scope.meeting.agenda.content).each(function () {
						if ($(this).find('.task-description').html()) {
							var task = makeTask($(this));
							var matchedTask = checkExistTask(task);
							if (matchedTask) {
								matchedTask.description = task.description;
								matchedTask.dueDate = task.dueDate;
								matchedTask.assignedBy = task.assignedBy;
								matchedTask.isCompleted = task.isCompleted;
								matchedTask.owner = task.owner;
								matchedTask.$save();
							} else {
								DataSrv
									.createData('Task', task)
									.then(function () {
										$scope.meeting.tasks.push(task);
										LoggerSrv.logSuccess('New task: "' + task.description + '" added');
									}, function () {
										LoggerSrv.logError('Saving task: "' + task.description + '" failed.');
									});

							}
						}
						if ($(this).find('.decision-description').html()) {
							var decision = makeDecision($(this));
							var matchedDecision = checkExistDecision(decision);
							if (matchedDecision) {
								matchedDecision.description = decision.description;
								matchedDecision.$save();
							} else {
								DataSrv
									.createData('Decision', decision)
									.then(function () {
										$scope.meeting.decisions.push(decision);
										LoggerSrv.logSuccess('New decision: "' + decision.description + '" added');
									}, function () {
										LoggerSrv.logError('Saving decision: "' + decision.description + '" failed.');
									});

							}
						}
					});
					$scope.meeting.$save();
					$scope.agendaEdit = false;
				};
				$scope.editNotes = function () {
					$scope.notesEditedContent = $scope.meeting.notes.content;
					$scope.notesEdit = true;
				};
				$scope.cancelNotes = function () {
					$scope.meeting.notes.content = $scope.notesEditedContent;
					$scope.notesEdit = false;
				};
				// Submit notes changes
				$scope.applyNotes = function () {
					$($scope.meeting.notes.content).each(function () {
						if ($(this).find('.task-description').html()) {
							var task = makeTask($(this));
							var matchedTask = checkExistTask(task);
							if (matchedTask) {
								matchedTask.description = task.description;
								matchedTask.dueDate = task.dueDate;
								matchedTask.assignedBy = task.assignedBy;
								matchedTask.isCompleted = task.isCompleted;
								matchedTask.owner = task.owner;
								matchedTask.$save();
							} else {
								DataSrv
									.createData('Task', task)
									.then(function () {
										$scope.meeting.tasks.push(task);
										LoggerSrv.logSuccess('New task: "' + task.description + '" added');
									}, function () {
										LoggerSrv.logError('Saving task: "' + task.description + '" failed.');
									});

							}
						}
						if ($(this).find('.decision-description').html()) {
							var decision = makeDecision($(this));
							var matchedDecision = checkExistDecision(decision);
							if (matchedDecision) {
								matchedDecision.description = decision.description;
								matchedDecision.$save();
							} else {
								DataSrv
									.createData('Decision', decision)
									.then(function () {
										$scope.meeting.decisions.push(decision);
										LoggerSrv.logSuccess('New decision: "' + decision.description + '" added');
									}, function () {
										LoggerSrv.logError('Saving decision: "' + decision.description + '" failed.');
									});

							}
						}
					});
					$scope.meeting.$save();
					$scope.notesEdit = false;
				};
				$scope.viewPDF = function (id) {
					var doc = new jsPDF();
					console.log('meeting-tab-' + id);
					doc.fromHTML(document.getElementById('meeting-tab-' + id), 15, 15, {
						'width': 170
					}, function () {
						$modal.open({
							templateUrl: 'viewPDF',
							controller: 'ModalCtrl'
						});
						$timeout(function () {
							var pdfString = doc.output('datauristring');
							document.getElementById('viewer').src = pdfString;
							document.getElementById('pdf-download').href = pdfString;
							switch (id) {
							case 0:
								document.getElementById('pdf-download').download = 'Meeting Agenda.PDF';
								break;
							case 1:
								document.getElementById('pdf-download').download = 'Meeting Notes.PDF';
								break;
							case 2:
								document.getElementById('pdf-download').download = 'Meeting Decisions.PDF';
								break;
							case 3:
								document.getElementById('pdf-download').download = 'Meeting Tasks.PDF';
								break;
							}
						}, 100);
					});
				};
				$scope.tabs = [{
					title: 'Agenda',
					include: 'views/main/view_one_meeting__agenda.html',
					active: true
				}, {
					title: 'Notes',
					include: 'views/main/view_one_meeting__notes.html'
				}, {
					title: 'Decisions',
					include: 'views/main/view_one_meeting__decisions.html'
				}, {
					title: 'Tasks',
					include: 'views/main/view_one_meeting__tasks.html'
				}];
				$scope.meetingid = $stateParams.meetingid;
				$scope.tabActive = [false, true, false, false];

				DataSrv.getData('Meeting', 'ID == :1', [$scope.meetingid]).then(function (result) {
					$scope.meeting = result[0];
					if ($scope.meeting) {
						DataSrv.fetchData($scope.meeting.workgroup).then(function () {
							console.log($scope.meeting);
						});
						DataSrv.fetchData($scope.meeting.participants).then(function () {
							$rootScope.participantWithEmail = [];
							$rootScope.sendAgendaTo = [];
							$rootScope.sendNotesTo = [];
							$rootScope.sendRemindersTo = [];
							$rootScope.sendAgendaCC = [];
							$rootScope.sendAgendaBCC = [];
							for (var i in $scope.meeting.participants) {
								if ($scope.meeting.participants[i].email) {
									$rootScope.participantWithEmail.push($scope.meeting.participants[i]);
									$rootScope.sendAgendaTo.push($scope.meeting.participants[i]);
									$rootScope.sendNotesTo.push($scope.meeting.participants[i]);
									$rootScope.sendRemindersTo.push($scope.meeting.participants[i]);
								}
							}
						});
						DataSrv.fetchData($scope.meeting.tasks).then(function () {
							var i = 0;
							while ($scope.meeting.tasks[i]) {
								var task = $scope.meeting.tasks[i];
								task.dueDate = new Date(task.dueDate);
								if (moment().diff(task.dueDate) > 0) {
									if (task.isCompleted) {
										task.overdue = false;
									} else {
										task.overdue = true;
									}
								} else {
									task.overdue = false;
								}
								getUser(task);
								i++;
							}
							DataSrv.fetchData($scope.meeting.decisions).then(function () {
								DataSrv.fetchData($scope.meeting.agenda).then(function () {
									matchTask($scope.meeting.agenda);
									matchDecision($scope.meeting.agenda);
								});
								DataSrv.fetchData($scope.meeting.notes).then(function () {
									matchTask($scope.meeting.notes);
									matchDecision($scope.meeting.notes);
								});
							});
						});
					}
				});
			});
		}
	]);
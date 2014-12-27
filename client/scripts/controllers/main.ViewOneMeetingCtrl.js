'use strict';
kuvenoApp
	.controller('ViewOneMeetingCtrl', [
		'$location',
		'$modal',
		'$rootScope',
		'$scope',
		'$state',
		'$stateParams',
		'$timeout',
		'$wakanda',
		'AssistSrv',
		'AuthSrv',
		'LoggerSrv',
		function ($location, $modal, $rootScope, $scope, $state, $stateParams, $timeout, $wakanda, AssistSrv, AuthSrv, LoggerSrv) {
			return AuthSrv.verify().then(function (data) {
				$scope.pdf = null;
				$scope.editorOptions = {
					language: 'en',
					uiColor: '#000000'
				};
				if (data) {
					if ($rootScope.onBack) {
						$rootScope.onBack = false;
					} else {
						$rootScope.$stateHistory.push('main.ViewOneMeeting');
					}
				}
				// Inject all user entities to $scope.users
				var loadAllUsers = function () {
					var userCollection = $wakanda.$ds.User.$find();
					userCollection.$promise.then(function (data) {
						var i = 0;
						while (data.result[i]) {
							$scope.users.push(data.result[i]);
							i++;
						}
					});
				};
				loadAllUsers();

				// Get an user entity which is indicated by userId
				var getUserById = function (userId) {
					for (var id in $scope.users) {
						if ($scope.users[id].ID === userId) {
							return $scope.users[id];
						}
					}
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
						console.log(task);
						task.$save();
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
				};

				$scope.editAgenda = function () {
					$scope.agendaEditedContent = $scope.meeting.agenda.content;
					$scope.agendaEdit = true;
				};
				$scope.cancelAgenda = function () {
					$scope.meeting.agenda.content = $scope.agendaEditedContent;
					$scope.agendaEdit = false;
				};
				$scope.applyAgenda = function () {
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
				$scope.applyNotes = function () {
					$scope.meeting.$save();
					$scope.notesEdit = false;
				};
				$scope.viewPDF = function (id) {
					var doc = new jsPDF();
					doc.fromHTML(document.getElementById('meeting-tab-' + id), 15, 15, {
						'width': 170
					}, function () {
						$modal.open({
							templateUrl: 'viewPDF',
							controller: 'ViewOneMeetingPDFCtrl'
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
				var meetingCollection = $wakanda.$ds.Meeting.$find({
					filter: 'ID == :1',
					params: [$scope.meetingid]
				});
				meetingCollection.$promise.then(function (meeting) {
					$scope.meeting = meeting.result[0];
					console.log($scope.meeting);
					if ($scope.meeting) {
						$scope.meeting.participantList = [];
						var participants = $scope.meeting.participants.$fetch();
						participants.then(function (data) {
							var i = 0;
							while (data[i]) {
								$scope.meeting.participantList.push(data[i]);
								i++;
							}
						});

						var agenda = $scope.meeting.agenda;
						agenda.$fetch();

						var notes = $scope.meeting.notes;
						notes.$fetch();

						var decisions = $scope.meeting.decisions;
						decisions.$fetch();

						var tasks = $scope.meeting.tasks;
						tasks.$fetch().then(function () {
							var i = 0;
							while ($scope.meeting.tasks[i]) {
								var task = $scope.meeting.tasks[i];
								task.owner.$fetch();
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
								i++;
							}
							console.log($scope.meeting.tasks);
						});
					}
				});
			});
		}
	])
	.controller('ViewOneMeetingPDFCtrl', [
		'$scope', '$modalInstance',
		function ($scope, $modalInstance) {
			$scope.close = function () {
				$modalInstance.dismiss('cancel');
			};
		}
	]);
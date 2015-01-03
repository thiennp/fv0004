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
					'<textarea class="tinymce" ui-tinymce ng-model="meeting.agenda.content" style="height: 500px"></textarea>',
					'<textarea class="tinymce" ui-tinymce ng-model="meeting.notes.content" style="height: 500px"></textarea>'
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
				};

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
						task.$save();
						LoggerSrv.log('Task updated');
					}
				};

				$scope.remove = function (task) {
					var index;
					index = $scope.meeting.tasks.indexOf(task);
					$scope.meeting.tasks.splice(index, 1);
					task.$remove();
					LoggerSrv.logError('Task removed');
				};

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
					console.log($scope.meeting);
					if ($scope.meeting) {
						DataSrv.fetchData($scope.meeting.participants);
						DataSrv.fetchData($scope.meeting.agenda);
						DataSrv.fetchData($scope.meeting.notes);
						DataSrv.fetchData($scope.meeting.decisions);
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
						});
					}
				});
			});
		}
	]);
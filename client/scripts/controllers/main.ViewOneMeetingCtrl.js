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
		function ($location, $modal, $rootScope, $scope, $state, $stateParams, $timeout, $wakanda, AssistSrv, AuthSrv) {
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
				$scope.editAgenda = function () {
					$scope.agendaEditedContent = $scope.meeting.agenda.content;
					$scope.calendarEdit = true;
				};
				$scope.cancelAgenda = function () {
					$scope.meeting.agenda.content = $scope.agendaEditedContent;
					$scope.calendarEdit = false;
				};
				$scope.applyAgenda = function () {
					$scope.meeting.$save();
					$scope.calendarEdit = false;
				};
				$scope.editNotes = function () {
					$scope.notesEditedContent = $scope.meeting.notes.content;
					$scope.calendarEdit = true;
				};
				$scope.cancelNotes = function () {
					$scope.meeting.notes.content = $scope.notesEditedContent;
					$scope.calendarEdit = false;
				};
				$scope.applyNotes = function () {
					$scope.meeting.$save();
					$scope.calendarEdit = false;
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
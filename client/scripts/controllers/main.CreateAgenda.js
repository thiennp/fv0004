'use strict';
kuvenoApp
	.controller('CreateAgendaCtrl', [
		'$modal',
		'$rootScope',
		'$scope',
		'$state',
		'$stateParams',
		'$timeout',
		'AuthSrv',
		'DataSrv',
		function ($modal, $rootScope, $scope, $state, $stateParams, $timeout, AuthSrv, DataSrv) {
			return AuthSrv.verify().then(function (data) {
				if (data) {
					if ($rootScope.onBack) {
						$rootScope.onBack = false;
					} else {
						$rootScope.$stateHistory.push('main.ViewOneMeeting');
					}
				}
				$scope.meeting = {
					'participantList': [],
					'meetingTime': new Date(),
					'isOnline': false,
					'agenda': {
						'content': ''
					}
				};
				$scope.onlineStatus = [{
					'name': 'Online',
					'value': true
				}, {
					'name': 'Offline',
					'value': false
				}];
				$scope.pdf = null;
				$scope.editorOptions = {
					language: 'en',
					uiColor: '#000000'
				};
				$scope.meetingGroupID = $stateParams.groupId;

				DataSrv
					.getData('Workgroup')
					.then(function (result) {
						$scope.groups = result;
					});

				DataSrv
					.getData('Workgroup', 'ID == :1', [$stateParams.groupId])
					.then(function (result) {
						$scope.meeting.group = result[0];
					});

				DataSrv
					.getData('User')
					.then(function (result) {
						$scope.users = result;
						if (result.length > 0) {
							$scope.addedParticipant = result[0];
						}
					});

				$scope.addParticipant = function () {
					$scope.meeting.participantList.push($scope.addedParticipant);
					for (var userId in $scope.users) {
						if ($scope.users[userId] === $scope.addedParticipant) {
							$scope.users.splice(userId, 1);
							break;
						}
					}
					if ($scope.users.length > 0) {
						$scope.addedParticipant = $scope.users[0];
					} else {
						$scope.addedParticipant = null;
					}
				};

				$scope.submit = function () {
					DataSrv
						.createData('Meeting', $scope.meeting)
						.then(function () {
							DataSrv
								.createData('Agenda', $scope.meeting.agenda)
								.then(function () {
									$state.go('main.Home');
								});
						});
				};
				$scope.sendAgenda = function () {
					$scope.CCshown = false;
					$scope.BCCshown = false;
					$modal.open({
						templateUrl: 'sendAgenda',
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
				$scope.viewPDF = function (id) {
					var doc = new jsPDF();
					doc.fromHTML(document.getElementById('meeting-pdf'), 15, 15, {
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
							document.getElementById('pdf-download').download = 'Meeting Agenda.PDF';
						}, 100);
					});
				};

				// Time control
				$scope.hstep = 1;
				$scope.mstep = 15;

				$scope.options = {
					'hstep': [1, 2, 3],
					'mstep': [1, 5, 10, 15, 25, 30]
				};

				$scope.update = function () {
					var d = new Date();
					d.setHours(14);
					d.setMinutes(0);
					$scope.meeting.meetingTime = d;
				};

				$scope.changed = function () {
					console.log('Time changed to: ' + $scope.meeting.meetingTime);
				};
			});
		}
	]);
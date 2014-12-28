'use strict';
kuvenoApp
	.controller('CreateAgendaCtrl', [
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
				$scope.meetingGroup = $wakanda.$ds.Workgroup.$find({
					filter: 'ID == :1',
					params: [$stateParams.groupId]
				});
				$scope.meetingGroup.$promise.then(function (data) {
					$scope.meeting.group = $scope.meetingGroup[0];
				});
				$scope.groups = $wakanda.$ds.Workgroup.$find();

				// Inject all user entities to $scope.users
				var loadAllUsers = function () {
					$scope.users = [];
					var userCollection = $wakanda.$ds.User.$find();
					userCollection.$promise.then(function (data) {
						var i = 0;
						while (data.result[i]) {
							$scope.users.push(data.result[i]);
							i++;
						}
						if ($scope.users.length > 0) {
							$scope.addedParticipant = $scope.users[0];
						}
					});
				};
				loadAllUsers();

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
					var newMeeting = $wakanda.$ds.Meeting.$create($scope.meeting);
					console.log(newMeeting);
					newMeeting.$save().then(function () {
						var newAgenda = $wakanda.$ds.Agenda.$create($scope.meeting.agenda);
						console.log(newAgenda);
						newAgenda.$save().then(function () {
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
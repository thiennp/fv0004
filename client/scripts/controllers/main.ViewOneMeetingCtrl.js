'use strict';
kuvenoApp
	.controller('ViewOneMeetingCtrl', [
		'$location',
		'$rootScope',
		'$scope',
		'$state',
		'$stateParams',
		'$wakanda',
		'AssistSrv',
		'AuthSrv',
		function ($location, $rootScope, $scope, $state, $stateParams, $wakanda, AssistSrv, AuthSrv) {
			return AuthSrv.verify().then(function (data) {
				if (data) {
					if ($rootScope.onBack) {
						$rootScope.onBack = false;
					} else {
						$rootScope.$stateHistory.push('main.ViewOneMeeting');
					}
				}
				$scope.tabs = [{
					title: 'Agenda',
					content: '',
					active: true
				}, {
					title: 'Notes',
					content: '',
				}, {
					title: 'Decisions',
					content: '',
					include: 'views/main/view_one_meeting__decisions.html'
				}, {
					title: 'Tasks',
					content: '',
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
						agenda.$fetch().then(function () {
							$scope.tabs[0].content = $scope.meeting.agenda.content;
						});

						var notes = $scope.meeting.notes;
						notes.$fetch().then(function () {
							$scope.tabs[1].content = $scope.meeting.notes.content;
						});

						var decisions = $scope.meeting.decisions;
						decisions.$fetch().then(function () {
							console.log(decisions);
						});

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
	]);
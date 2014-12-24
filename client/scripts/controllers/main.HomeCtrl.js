'use strict';
kuvenoApp
	.controller('HomeCtrl', [
		'$location',
		'$rootScope',
		'$scope',
		'$state',
		'$wakanda',
		'AssistSrv',
		'AuthSrv',
		function ($location, $rootScope, $scope, $state, $wakanda, AssistSrv, AuthSrv) {
			return AuthSrv.verify().then(function (data) {
				if (data) {
					if ($rootScope.onBack) {
						$rootScope.onBack = false;
					} else {
						$rootScope.$stateHistory.push('main.Home');
					}
					$scope.groups = [];
					$scope.futureMeeting = [];
					$scope.overdueTasks = 0;
					$scope.openTasks = 0;
					$scope.closedTasks = 0;
					var meetingPromise = [];
					$scope.groups = $wakanda.$ds.Workgroup.$find();
					$scope.groups.$promise.then(function () {
						for (var i = 0; i < $scope.groups.length; i++) {
							$scope.groups[i].meetingList = [];
							$scope.groups[i].futureMeeting = [];
							$scope.groups[i].pastMeeting = [];
							meetingPromise[i] = $scope.groups[i].meetings.$fetch();
							getMeeting(meetingPromise[i], i);
						}
					});
				}

				var getMeeting = function (meetingCollection, index) {
					meetingCollection.then(function (meetings) {
						var i = 0;
						while (meetings[i]) {
							$scope.groups[index].meetingList[i] = meetings[i];
							$scope.groups[index].meetingList[i].group = $scope.groups[index].name;
							if (moment().diff($scope.groups[index].meetingList[i].meetingTime) < 0) {
								$scope.groups[index].meetingList[i].status = 'future';
								$scope.groups[index].futureMeeting.push($scope.groups[index].meetingList[i]);
								$scope.futureMeeting.push($scope.groups[index].meetingList[i]);
							} else {
								$scope.groups[index].meetingList[i].status = 'past';
								$scope.groups[index].pastMeeting.push($scope.groups[index].meetingList[i]);
							}
							getTask(index, i);
							getDecision(index, i);
							i++;
						}
						switch ($scope.groups[index].futureMeeting.length) {
						case 0:
							$scope.groups[index].pastMeeting.splice(3);
							break;
						case 1:
							$scope.groups[index].pastMeeting.splice(2);
							break;
						default:
							$scope.groups[index].pastMeeting.splice(1);
							break;
						}
					});
				};

				var getTask = function (groupId, meetingId) {
					$wakanda.$ds.Task.$find({
						filter: 'meeting.ID == :1',
						params: [$scope.groups[groupId].meetingList[meetingId].ID]
					}).$promise.then(function (tasks) {
						$scope.groups[groupId].meetingList[meetingId].tasks = tasks.result;
						for (var i in tasks.result) {
							if (tasks.result[i].isCompleted) {
								$scope.closedTasks++;
							} else {
								$scope.openTasks++;
								if (tasks.result[i].dueDate) {
									if (moment().diff(tasks.result[i].dueDate)) {
										$scope.overdueTasks++;
									}
								}
							}
						}
					});
				};

				var getDecision = function (groupId, meetingId) {
					$wakanda.$ds.Decision.$find({
						filter: 'meeting.ID == :1',
						params: [$scope.groups[groupId].meetingList[meetingId].ID]
					}).$promise.then(function (decisions) {
						$scope.groups[groupId].meetingList[meetingId].decisions = decisions.result;
					});
				};

				$scope.buttonGroupStyle = function () {
					var totalHeight = 0;
					var groupId = 0;
					for (var i = 0; i < document.getElementById('meeting-groups').firstChild.childNodes.length; i++) {
						if ($scope.groups) {
							if ($scope.groups[groupId]) {
								if ($scope.groups[groupId].isopen) {
									return {
										'padding-top': totalHeight + 'px',
										'opacity': 1
									};
								}
							}
							if (document.getElementById('meeting-groups').firstChild.childNodes[i].tagName === 'DIV') {
								totalHeight += document.getElementById('meeting-groups').firstChild.childNodes[i].offsetHeight + 5;
								groupId++;
							}
						}
					}
					return {
						'padding-top': 0,
						'opacity': 0
					};
				};

				$scope.gotoMeeting = function (meetingId) {
					$state.go('main.ViewOneMeeting', {
						'meetingid': meetingId
					});
				};
			});
		}
	]);
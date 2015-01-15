'use strict';
kuvenoApp
	.controller('HomeCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'AuthSrv',
		'DataSrv',
		'Workgroup',
		function ($rootScope, $scope, $state, AuthSrv, DataSrv, Workgroup) {
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

					Workgroup.findAll().$promise.then(function (result) {
						$scope.groups = result.workgroups;
						for (var i in $scope.groups) {
							$scope.groups[i].meetingList = [];
							$scope.groups[i].futureMeeting = [];
							$scope.groups[i].pastMeeting = [];
							getMeeting(i);
						}
					});
				}

				var getMeeting = function (index) {
						console.log($scope.groups[index]);
						// DataSrv
						// 	.fetchData($scope.groups[index].meetings)
						// 	.then(function (result) {
						// 		var i = 0;
						// 		while (result[i]) {
						// 			$scope.groups[index].meetingList[i] = result[i];
						// 			$scope.groups[index].meetingList[i].group = $scope.groups[index].name;
						// 			if (moment().diff($scope.groups[index].meetingList[i].meetingTime) < 0) {
						// 				$scope.groups[index].meetingList[i].status = 'future';
						// 				$scope.groups[index].futureMeeting.push($scope.groups[index].meetingList[i]);
						// 				$scope.futureMeeting.push($scope.groups[index].meetingList[i]);
						// 			} else {
						// 				$scope.groups[index].meetingList[i].status = 'past';
						// 				$scope.groups[index].pastMeeting.push($scope.groups[index].meetingList[i]);
						// 			}
						// 			getTask(index, i);
						// 			getDecision(index, i);
						// 			i++;
						// 		}
						// 		switch ($scope.groups[index].futureMeeting.length) {
						// 		case 0:
						// 			$scope.groups[index].pastMeeting.splice(3);
						// 			break;
						// 		case 1:
						// 			$scope.groups[index].pastMeeting.splice(2);
						// 			break;
						// 		default:
						// 			$scope.groups[index].pastMeeting.splice(1);
						// 			break;
						// 		}
						// 		if (Number(index) === 0) {
						// 			$scope.groups[index].isopen = true;
						// 		}
						// 	});
					},
					getTask = function (groupId, meetingId) {
						// DataSrv
						// 	.getData('Task', 'meeting.ID == :1', [$scope.groups[groupId].meetingList[meetingId].ID])
						// 	.then(function (result) {
						// 		$scope.groups[groupId].meetingList[meetingId].tasks = result;
						// 		for (var i in result) {
						// 			if (result[i].isCompleted) {
						// 				$scope.closedTasks++;
						// 			} else {
						// 				$scope.openTasks++;
						// 				if (result[i].dueDate) {
						// 					if (moment().diff(result[i].dueDate)) {
						// 						$scope.overdueTasks++;
						// 					}
						// 				}
						// 			}
						// 		}
						// 	});
					},
					getDecision = function (groupId, meetingId) {
						// DataSrv
						// 	.getData('Decision', 'meeting.ID == :1', [$scope.groups[groupId].meetingList[meetingId].ID])
						// 	.then(function (result) {
						// 		$scope.groups[groupId].meetingList[meetingId].decisions = result;
						// 	});
					};

				$scope.buttonGroupStyle = function () {
					var totalHeight = 0;
					var groupId = 0;
					for (var i = 0; i < document.getElementById('meeting-groups').firstChild.childNodes.length; i++) {
						if ($scope.groups) {
							if ($scope.groups[groupId]) {
								if ($scope.groups[groupId].isopen) {
									$scope.currentGroupId = $scope.groups[groupId].ID;
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
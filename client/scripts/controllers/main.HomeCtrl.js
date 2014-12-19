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
				var linkedinCode;
				$scope.groups = [];
				$scope.futureMeeting = [];
				if (data) {
					if ($rootScope.onBack) {
						$rootScope.onBack = false;
					} else {
						$rootScope.$stateHistory.push('main.Home');
					}
					if ($location.$$absUrl.split('?code=').length > 1) {
						linkedinCode = $location.$$absUrl.split('?code=')[1].split('#/')[0];
						AuthSrv.linkedin(linkedinCode);
					}
				}
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

				var getMeeting = function (meetingCollection, index) {
					meetingCollection.then(function (meetings) {
						var i = 0;
						var now = new Date();
						while (meetings[i]) {
							$scope.groups[index].meetingList[i] = meetings[i];
							$scope.groups[index].meetingList[i].meetingTime = new Date($scope.groups[index].meetingList[i].meetingTime);
							$scope.groups[index].meetingList[i].time = AssistSrv.timeToString($scope.groups[index].meetingList[i].meetingTime);
							$scope.groups[index].meetingList[i].group = $scope.groups[index].name;
							if ($scope.groups[index].meetingList[i].meetingTime > now) {
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
						var now = new Date();
						for (var i in tasks.result) {
							if (tasks.result[i].isCompleted) {
								$scope.closedTasks++;
							} else {
								$scope.openTasks++;
								if (tasks.result[i].dueDate) {
									var date = new Date(tasks.result[i].dueDate);
									if (date < now) {
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
				// $rootScope.userCollection.$promise.then(function (user) {
				// 	var workgroups = user.result[0].membershipWorkgroups;
				// 	var meetings = user.result[0].meetings;
				// 	workgroups.$fetch().then(function (_workgroups) {
				// 		for (var i = 0; i < _workgroups.$totalCount; i++) {
				// 			$scope.groups[i] = _workgroups[i];
				// 			console.log($scope.groups[i]);
				// 		}
				// 		meetings.$fetch().then(function (_meetings) {
				// 			console.log(_meetings);
				// 		});
				// 		// $scope.allFutureMeetings = [];
				// 		// for (var groupId in $scope.groups) {
				// 		// 	var countFuture = 0;
				// 		// 	for (var meetingId in $scope.groups[groupId].meetings) {
				// 		// 		$scope.groups[groupId].meetings[meetingId].group = $scope.groups[groupId].title;
				// 		// 		if ($scope.groups[groupId].meetings[meetingId].status === 'future') {
				// 		// 			$scope.allFutureMeetings.push($scope.groups[groupId].meetings[meetingId]);
				// 		// 			countFuture++;
				// 		// 		}
				// 		// 	}
				// 		// 	if (countFuture < 3) {
				// 		// 		$scope.groups[groupId].pastShown = 3 - countFuture;
				// 		// 	} else {
				// 		// 		$scope.groups[groupId].pastShown = 1;
				// 		// 	}
				// 		// }
				// 	});
				// });

				$scope.buttonGroupStyle = function () {
					var totalHeight = 0;
					var groupId = 0;
					for (var i = 0; i < document.getElementById('meeting-groups').firstChild.childNodes.length; i++) {
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
					return {
						'padding-top': 0,
						'opacity': 0
					};
				};
			});
		}
	]);
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
				$scope.meetingid = $stateParams.meetingid;
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
						// console.log(agenda);
						// agenda.then(function (data) {
						// 	console.log(data);
						// });
					}
				});
			});
		}
	]);
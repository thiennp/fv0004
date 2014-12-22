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
				$scope.meetingid = $stateParams.meetingid;
				var meetingCollection = $wakanda.$ds.Meeting.$find({
					filter: 'ID == :1',
					params: [$scope.meetingid]
				});
				meetingCollection.$promise.then(function (meeting) {
					$scope.meeting = meeting.result[0];
					console.log($scope.meeting);
					if ($scope.meeting) {
						$scope.meeting.time = $scope.meeting.meetingTime.toLocaleString();
						$scope.meeting.participants = [];
						var participants = $scope.meeting.participants.$fetch();
						participants.then(function (data) {
							var i = 0;
							while (data[i]) {
								$scope.meeting.participants.push(data[i]);
							}
						});
					}
				});
			});
		}
	]);
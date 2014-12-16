'use strict';
kuvenoApp
	.controller('HomeCtrl', [
		'$location',
		'$rootScope',
		'$scope',
		'$state',
		'$wakanda',
		'AuthSrv',
		function ($location, $rootScope, $scope, $state, $wakanda, AuthSrv) {
			return AuthSrv.verify().then(function (data) {
				var linkedinCode;
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
				$scope.overdueTasks = Math.floor(Math.random() * 100);
				$scope.openTasks = Math.floor(Math.random() * 100);
				$scope.closedTasks = Math.floor(Math.random() * 100);
				var groups = $wakanda.$ds.User.membershipWorkgroups;
				console.log(groups);
				$scope.groups = [{
					'title': 'Group 1',
					'meetings': [{
						'title': 'Meeting 1',
						'date': '14/12/2014',
						'status': 'future',
						'tasks': Math.floor(Math.random() * 100),
						'decisions': Math.floor(Math.random() * 100)
					}, {
						'title': 'Meeting 2',
						'date': '14/12/2014',
						'status': 'future',
						'tasks': Math.floor(Math.random() * 100),
						'decisions': Math.floor(Math.random() * 100)
					}, {
						'title': 'Meeting 3',
						'date': '14/12/2014',
						'status': 'past',
						'tasks': Math.floor(Math.random() * 100),
						'decisions': Math.floor(Math.random() * 100)
					}, {
						'title': 'Meeting 4',
						'date': '14/12/2014',
						'status': 'past',
						'tasks': Math.floor(Math.random() * 100),
						'decisions': Math.floor(Math.random() * 100)
					}],
					'isopen': false
				}, {
					'title': 'Group 2',
					'meetings': [{
						'title': 'Meeting 1',
						'date': '14/12/2014',
						'status': 'future',
						'tasks': Math.floor(Math.random() * 100),
						'decisions': Math.floor(Math.random() * 100)
					}, {
						'title': 'Meeting 2',
						'date': '14/12/2014',
						'status': 'future',
						'tasks': Math.floor(Math.random() * 100),
						'decisions': Math.floor(Math.random() * 100)
					}, {
						'title': 'Meeting 3',
						'date': '14/12/2014',
						'status': 'past',
						'tasks': Math.floor(Math.random() * 100),
						'decisions': Math.floor(Math.random() * 100)
					}, {
						'title': 'Meeting 4',
						'date': '14/12/2014',
						'status': 'past',
						'tasks': Math.floor(Math.random() * 100),
						'decisions': Math.floor(Math.random() * 100)
					}, {
						'title': 'Meeting 5',
						'date': '14/12/2014',
						'status': 'past',
						'tasks': Math.floor(Math.random() * 100),
						'decisions': Math.floor(Math.random() * 100)
					}],
					'isopen': true
				}, {
					'title': 'Group 3',
					'meetings': [{
						'title': 'Meeting 1',
						'date': '14/12/2014',
						'status': 'future',
						'tasks': Math.floor(Math.random() * 100),
						'decisions': Math.floor(Math.random() * 100)
					}, {
						'title': 'Meeting 2',
						'date': '14/12/2014',
						'status': 'past',
						'tasks': Math.floor(Math.random() * 100),
						'decisions': Math.floor(Math.random() * 100)
					}, {
						'title': 'Meeting 3',
						'date': '14/12/2014',
						'status': 'past',
						'tasks': Math.floor(Math.random() * 100),
						'decisions': Math.floor(Math.random() * 100)
					}],
					'isopen': false
				}];
				$scope.allFutureMeetings = [];
				for (var groupId in $scope.groups) {
					var countFuture = 0;
					for (var meetingId in $scope.groups[groupId].meetings) {
						$scope.groups[groupId].meetings[meetingId].group = $scope.groups[groupId].title;
						if ($scope.groups[groupId].meetings[meetingId].status === 'future') {
							$scope.allFutureMeetings.push($scope.groups[groupId].meetings[meetingId]);
							countFuture++;
						}
					}
					if (countFuture < 3) {
						$scope.groups[groupId].pastShown = 3 - countFuture;
					} else {
						$scope.groups[groupId].pastShown = 1;
					}
				}
				$scope.buttonGroupStyle = function () {
					var totalHeight = 0;
					groupId = 0;
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
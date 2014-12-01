'use strict';

angular.module('fv0004App')
	.controller('CommentCtrl', function ($scope, $firebase, $routeParams, $rootScope, $wakanda) {
		var ref = new Firebase('https://popping-inferno-4762.firebaseio.com/'),
			sync = $firebase(ref.child('fv0004').child('groups').child($routeParams.id).child('messages')),
			dateString = function (month, day) {
				switch (day) {
				case 1:
				case 21:
					day += 'st ';
					break;
				case 2:
				case 22:
					day += 'nd ';
					break;
				case 3:
				case 23:
					day += 'nd ';
					break;
				default:
					day += 'th ';
					break;
				}
				month = ['Jannuary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month - 1];
				return day + month;
			},
			timeString = function (hour, minute) {
				if (parseInt(hour) === 0) {
					return '12:' + minute + 'am';
				} else if (hour < 12) {
					return hour + ':' + minute + 'am';
				} else {
					return hour + ':' + minute + 'pm';
				}
			},
			currentDateString = function () {
				var date = new Date();
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				if (m < 10) {
					m = '0' + m;
				}
				var d = date.getDate();
				if (d < 10) {
					d = '0' + d;
				}
				var h = date.getHours();
				if (h < 10) {
					h = '0' + h;
				}
				var i = date.getMinutes();
				if (i < 10) {
					i = '0' + i;
				}
				var s = date.getSeconds();
				if (s < 10) {
					s = '0' + s;
				}
				return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
			};

		ref.child('fv0004/users').on('value', function (snapshot) {
			var users = snapshot.val();
			for (var i in users) {
				if ($rootScope.userid === undefined) {
					$rootScope.userid = 1;
				}
				if (parseInt(users[i].id) === $rootScope.userid) {
					$scope.user = users[i];
				}
			}
			ref.child('fv0004/groups').on('value', function (snapshot) {
				var commentRawData = snapshot.val()[$routeParams.id].messages;
				var commentByDate = {};
				$scope.comments = [];
				$scope.comment_maxid = 0;

				// Create comments array base on return data and group by date
				for (var i in commentRawData) {
					// Convert string date to Date type data
					var commentTimeArray = commentRawData[i].update_at.split(' ')[0].split('-').concat(commentRawData[i].update_at.split(' ')[1].split(':')).concat('0');
					commentRawData[i].date = new Date(commentTimeArray[0], commentTimeArray[1] - 1, commentTimeArray[2], commentTimeArray[3], commentTimeArray[4], commentTimeArray[5], commentTimeArray[6]);

					// Change the date title to "Today" if the comment update date is today
					var commentDate = commentRawData[i].update_at.split(' ')[0];
					var todaysDate = new Date();
					commentRawData[i].dateString = dateString(commentTimeArray[1], commentTimeArray[2]);
					commentRawData[i].timeString = timeString(commentTimeArray[3], commentTimeArray[4]);
					if (commentRawData[i].date.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)) {
						commentDate = 'Today';
					}

					// Group data by date;
					if (!commentByDate[commentDate]) {
						commentByDate[commentDate] = [commentRawData[i]];
					} else {
						commentByDate[commentDate].push(commentRawData[i]);
					}

					// Check max_id
					if ($scope.comment_maxid < commentRawData[i].id) {
						$scope.comment_maxid = commentRawData[i].id;
					}
				}

				for (i in commentByDate) {
					$scope.comments.push({
						dateTitle: i,
						list: commentByDate[i]
					});
				}
				// Update the flow
				$scope.$apply();
			});
		});

		$scope.sendMessage = function () {
			var sendData = {
				'description': $scope.message,
				'id': $scope.comment_maxid + 1,
				'title': $scope.user.name,
				'update_at': currentDateString()
			};
			sync.$push(sendData).then(function (newChildRef) {
				$scope.message = '';
			});
		};
	});
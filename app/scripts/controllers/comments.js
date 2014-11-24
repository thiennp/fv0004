'use strict';

angular.module('fv0004App')
	.controller('CommentsCtrl', function ($scope, $firebase) {
		var ref = new Firebase('https://popping-inferno-4762.firebaseio.com/'),
			sync = $firebase(ref),
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
			};

		ref.child('fv0004/messages').on('value', function (snapshot) {
			var commentRawData = snapshot.val();
			var commentByDate = {};
			$scope.comments = [];

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
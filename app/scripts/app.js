'use strict';

/**
 * @ngdoc overview
 * @name fv0004App
 * @description
 * # fv0004App
 *
 * Main module of the application.
 */
angular
	.module('fv0004App', [
		'ngAnimate',
		'ngAria',
		'ngCookies',
		'ngMessages',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'firebase'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/comment_users', {
				templateUrl: 'views/comment_users.html',
				controller: 'CommentUsersCtrl'
			})
			.when('/comment_groups/:userId', {
				templateUrl: 'views/comment_groups.html',
				controller: 'CommentGroupsCtrl'
			})
			.when('/comment/:id', {
				templateUrl: 'views/comment.html',
				controller: 'CommentCtrl'
			})
			.otherwise({
				redirectTo: '/comment_users'
			});
	});
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
			.when('/comments', {
				templateUrl: 'views/comments.html',
				controller: 'CommentsCtrl'
			})
			.otherwise({
				redirectTo: '/comments'
			});
	});
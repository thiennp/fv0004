'use strict';

angular.module('app.user.controllers', [])

.controller('ProfileCtrl', [
	'$scope'
	'$state'
	'Auth'
	'$location'
	($scope, $state, Auth, $location) ->
		Auth.verify()
		$scope.user = 
			'id': localStorage.getItem 'user_id'
			'first_name': localStorage.getItem 'user_first_name'
			'last_name': localStorage.getItem 'user_last_name'
			'link': localStorage.getItem 'user_link'
			'locale': localStorage.getItem 'user_locale'
			'name': localStorage.getItem 'user_name'
			'timezone': localStorage.getItem 'user_timezone'
			'updated_time': localStorage.getItem 'user_updated_time'
			'verified': localStorage.getItem 'user_verified'
			'avatar': 'http://graph.facebook.com/'+localStorage.getItem('user_id')+'/picture'
		# http://graph.facebook.com/sarfraz.anees/picture
])

.controller('GroupsCtrl', [
	'$scope'
	($scope) ->
		console.log 'Groups'
])

.controller('MyTaskCtrl', [
	'$scope'
	($scope) ->
		console.log 'My Task'
])

.controller('UpCommingMeetingCtrl', [
	'$scope'
	($scope) ->
		console.log 'Up Comming Meeting'
])
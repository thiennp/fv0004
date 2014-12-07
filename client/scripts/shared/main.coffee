'use strict';

angular.module('app.controllers', [])

# overall control
.controller('AppCtrl', [
	'$scope'
	'$location'
	($scope, $location) ->
		$scope.isSpecificPage = ->
			path = $location.path()
			return _.contains( ['/auth/sign_up', '/auth/sign_in'], path )

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

		$scope.main =
			brand: 'Webapp'
			name: $scope.user.name
])

.controller('NavCtrl', [
	'$scope'
	'taskStorage'
	'filterFilter'
	($scope, taskStorage, filterFilter) ->
		# init
		tasks = $scope.tasks = taskStorage.get()
		$scope.taskRemainingCount = filterFilter(tasks, {completed: false}).length

		$scope.$on('taskRemaining:changed', (event, count) ->
			$scope.taskRemainingCount = count
		)
])

.controller('MainCtrl', [
	'$scope'
	'$state'
	'Auth'
	'$location'
	($scope, $state, Auth, $location) ->
		if $location.$$absUrl.split('?code=').length > 1
			linkedinCode = $location.$$absUrl.split('?code=')[1].split('#/')[0]
			Auth.linkedin(linkedinCode)
		Auth.verify()
])

.controller('CreateMeetingNoteCtrl', [
	'$scope'
	($scope) ->
		console.log 'Create Meeting Note'
])
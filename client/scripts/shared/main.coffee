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

		$scope.main =
			brand: 'Flatify'
			name: 'Lisa Doe' # those which uses i18n can not be replaced with two way binding var for now.

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
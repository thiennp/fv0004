'use strict';

angular.module('app.action.controllers', [])

.controller('AgreeOnDateCtrl', [
	'$scope'
	($scope) ->
		console.log 'Agree On Date'
])

.controller('CreateAgendaCtrl', [
	'$scope'
	($scope) ->
		console.log 'Create Agenda'
])

.controller('ViewMeetingCtrl', [
	'$scope'
	($scope) ->
		console.log 'View Meeting'
])

.controller('ListAllMeetingCtrl', [
	'$scope'
	($scope) ->
		console.log 'List All Meeting'
])

.controller('CreateEMeetingCtrl', [
	'$scope'
	($scope) ->
		console.log 'Create E-Meeting'
])

.controller('ViewEMeetingCtrl', [
	'$scope'
	($scope) ->
		console.log 'View E-Meeting'
])
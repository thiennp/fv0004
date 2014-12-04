(function() {
  'use strict';
  angular.module('app.action.controllers', []).controller('AgreeOnDateCtrl', [
    '$scope', function($scope) {
      return console.log('Agree On Date');
    }
  ]).controller('CreateAgendaCtrl', [
    '$scope', function($scope) {
      return console.log('Create Agenda');
    }
  ]).controller('ViewMeetingCtrl', [
    '$scope', function($scope) {
      return console.log('View Meeting');
    }
  ]).controller('ListAllMeetingCtrl', [
    '$scope', function($scope) {
      return console.log('List All Meeting');
    }
  ]).controller('CreateEMeetingCtrl', [
    '$scope', function($scope) {
      return console.log('Create E-Meeting');
    }
  ]).controller('ViewEMeetingCtrl', [
    '$scope', function($scope) {
      return console.log('View E-Meeting');
    }
  ]);

}).call(this);

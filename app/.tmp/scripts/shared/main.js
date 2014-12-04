(function() {
  'use strict';
  angular.module('app.controllers', []).controller('AppCtrl', [
    '$scope', '$location', function($scope, $location) {
      $scope.isSpecificPage = function() {
        var path;
        path = $location.path();
        return _.contains(['/auth/sign_up', '/auth/sign_in'], path);
      };
      return $scope.main = {
        brand: 'Flatify',
        name: 'Lisa Doe'
      };
    }
  ]).controller('NavCtrl', [
    '$scope', 'taskStorage', 'filterFilter', function($scope, taskStorage, filterFilter) {
      var tasks;
      tasks = $scope.tasks = taskStorage.get();
      $scope.taskRemainingCount = filterFilter(tasks, {
        completed: false
      }).length;
      return $scope.$on('taskRemaining:changed', function(event, count) {
        return $scope.taskRemainingCount = count;
      });
    }
  ]).controller('MainCtrl', [
    '$scope', '$stateParams', function($scope, $stateParams) {
      return console.log($stateParams);
    }
  ]).controller('CreateMeetingNoteCtrl', [
    '$scope', function($scope) {
      return console.log('Create Meeting Note');
    }
  ]);

}).call(this);

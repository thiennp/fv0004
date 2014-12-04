(function() {
  'use strict';
  angular.module('app.user.controllers', []).controller('ProfileCtrl', [
    '$scope', function($scope) {
      return console.log('Profile');
    }
  ]).controller('GroupsCtrl', [
    '$scope', function($scope) {
      return console.log('Groups');
    }
  ]).controller('MyTaskCtrl', [
    '$scope', function($scope) {
      return console.log('My Task');
    }
  ]).controller('UpCommingMeetingCtrl', [
    '$scope', function($scope) {
      return console.log('Up Comming Meeting');
    }
  ]);

}).call(this);

(function() {
  'use strict';
  angular.module('app.action.controllers', []).controller('SignUpCtrl', [
    '$scope', function($scope) {
      return console.log('Sign Up');
    }
  ]).controller('SignInCtrl', [
    '$scope', function($scope) {
      return console.log('Sign In');
    }
  ]);

}).call(this);

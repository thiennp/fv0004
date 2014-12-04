(function() {
  'use strict';
  angular.module('app.auth.controllers', []).controller('SignUpCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {}]).controller('SignInCtrl', [
    '$scope', function($scope) {
      return console.log('Sign In');
    }
  ]);

}).call(this);

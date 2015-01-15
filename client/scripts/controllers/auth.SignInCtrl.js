'use strict';
kuvenoApp
	.controller('SignInCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'AuthSrv',
		function ($rootScope, $scope, $state, AuthSrv) {
			$scope.authStatus = {
				'error': false,
				'errorMessage': ''
			};
			$scope.facebookLogin = function () {
				return AuthSrv.facebookLogin();
			};
			$scope.linkedinLogin = function () {};
			$scope.emailLogin = function () {
				var user = {
					'email': signinForm.email.value,
					'password': signinForm.password.value
				};
				$scope.loading = true;
				AuthSrv.login(user).then(function (data) {
					$scope.loading = false;
					$scope.authStatus = data;
					if ($scope.authStatus.error === false) {
						$state.go('user.Profile');
					}
				});
			};
		}
	]);
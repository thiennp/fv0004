'use strict';
kuvenoApp
	.controller('SignInCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'$wakanda',
		'AuthSrv',
		'KuvenoUser',
		function ($rootScope, $scope, $state, $wakanda, AuthSrv, KuvenoUser) {
			$scope.facebookLogin = function () {
				return AuthSrv.facebookLogin();
			};
			$scope.linkedinLogin = function () {};
			$scope.emailLogin = function () {
				var user = {
					'email': signinForm.email.value,
					'password': signinForm.password.value
				};
				KuvenoUser.login(user).$promise.then(function (data) {
					console.log(data);
					if (data) {
						if (data.user) {
							$rootScope.user = data.user;
							$scope.error = false;
							localStorage.setItem('user_id', $rootScope.user.id);
							localStorage.setItem('user_email', $rootScope.user.email);
							localStorage.setItem('user_firstname', $rootScope.user.firstname);
							localStorage.setItem('user_lastname', $rootScope.user.lastname);
							localStorage.setItem('user_title', $rootScope.user.title);
							$state.go('user.Profile');
						} else {
							$scope.error = true;
							$scope.errorMessage = 'Email or password is not correct';
							$scope.loading = false;
						}
					} else {
						$scope.error = true;
						$scope.errorMessage = 'Network error';
						$scope.loading = false;
					}
				});
			};
		}
	]);
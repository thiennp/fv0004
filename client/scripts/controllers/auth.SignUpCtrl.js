'use strict';
kuvenoApp
	.controller('SignUpCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'$wakanda',
		'AuthSrv',
		function ($scope, $rootScope, $state, $wakanda, AuthSrv) {
			$scope.facebookRegister = function () {
				AuthSrv.facebookLogin();
			};
			$scope.unmatchedPassword = function () {
				if (signupForm.password.value !== signupForm.retypePassword.value) {
					return true;
				} else {
					return false;
				}
			};
			$scope.emailRegister = function (isValid) {
				$scope.error = false;
				$scope.loading = true;
				var newUser = $wakanda.$ds.User.signUpNewUser(signupForm.email.value, signupForm.password.value);
				switch (newUser.status) {
				case 'error-existing-account':
					$scope.error = true;
					$scope.errorMessage = newUser.info;
					$scope.loading = false;
					break;
				case 'ok-user-and-account-added':
					$rootScope.user = {
						'Id': newUser.userId
					};
					$wakanda.$login(signupForm.email.value, signupForm.password.value).then(function (data) {
						$scope.loading = false;
						if (data.result) {
							localStorage.setItem('user_id', data.result.userId);
							localStorage.setItem('user_email', signupForm.email.value);
							$state.go('user.ProfileUpdate');
						} else {
							$scope.error = true;
							$scope.errorMessage = 'Login error';
						}
					});
					break;
				}
			};
		}
	]);
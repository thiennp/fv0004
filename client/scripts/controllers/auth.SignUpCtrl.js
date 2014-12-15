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
				var newUser = $wakanda.$ds.User.signUpNewUser(signupForm.email.value, signupForm.password.value);
				$rootScope.user = newUser;
				$wakanda.$login(signupForm.email.value, signupForm.password.value).then(function (data) {
					if (data.result) {
						$wakanda.$currentUser().then(function (user) {
							localStorage.setItem('user_id', user.result.ID);
							localStorage.setItem('user_email', user.result.userName);
							$state.go('user.ProfileUpdate');
						});
					} else {
						console.log(data);
					}
				});
			};
		}
	]);
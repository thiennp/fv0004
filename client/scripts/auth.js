'use strict';
angular.module('app.auth.controllers', [])

.controller('SignUpCtrl', [
	'$rootScope', '$scope', '$state', '$wakanda', 'Assist', 'Auth',
	function ($scope, $rootScope, $state, $wakanda, Assist, Auth) {
		$scope.facebookRegister = function () {
			Auth.facebookLogin();
		};
		$scope.unmatchedPassword = function () {
			if (signupForm.password.value != signupForm.retypePassword.value) {
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
				};
			});
		};
	}
])

.controller('SignInCtrl', [
	'$q',
	'$rootScope',
	'$scope',
	'$state',
	'$wakanda',
	'Assist',
	'Auth',
	function ($q, $rootScope, $scope, $state, $wakanda, Assist, Auth) {
		var defer = $q.defer();
		$scope.facebookLogin = function () {
			return Auth.facebookLogin();
		};
		$scope.linkedinLogin = function () {
			return window.location.href = 'https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=7581d2bszc4sid&scope=r_emailaddress%20r_fullprofile%20r_basicprofile&state=KbyUmhTLMpYj7CD2di7JKP1PcqmLlkPt&redirect_uri=http://localhost:9000';
		};
		$scope.emailLogin = function () {
			var user;
			$wakanda.$login(signinForm.email.value, signinForm.password.value).then(function (data) {
				if (data.result) {
					$scope.error = false;
					$wakanda.$currentUser().then(function (user) {
						localStorage.setItem('user_id', user.result.ID);
						localStorage.setItem('user_email', user.result.userName);
						$wakanda.$ds.User.$findOne(user.result.ID).$promise.then(function (data) {
							localStorage.setItem('user_firstname', data.result.firstname);
							localStorage.setItem('user_lastname', data.result.lastname);
							localStorage.setItem('user_title', data.result.title);
							$rootScope.user = data.result;
						});
						$state.go('user.Profile');
					});
				} else {
					$scope.error = true;
				};
			});
		};
	}
]);
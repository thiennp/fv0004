'use strict';
kuvenoApp
	.controller('SignInCtrl', [
		'$q',
		'$rootScope',
		'$scope',
		'$state',
		'$wakanda',
		'AuthSrv',
		function ($q, $rootScope, $scope, $state, $wakanda, AuthSrv) {
			var defer = $q.defer();
			$scope.facebookLogin = function () {
				return AuthSrv.facebookLogin();
			};
			$scope.linkedinLogin = function () {
				window.location.href = 'https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=7581d2bszc4sid&scope=r_emailaddress%20r_fullprofile%20r_basicprofile&state=KbyUmhTLMpYj7CD2di7JKP1PcqmLlkPt&redirect_uri=http://localhost:9000';
			};
			$scope.emailLogin = function () {
				$scope.error = false;
				$scope.loading = true;
				$wakanda.$login(signinForm.email.value, signinForm.password.value).then(function (data) {
					if (data.result) {
						$scope.error = false;
						$rootScope.userCollection = $wakanda.$ds.User.$find({
							filter: 'email == :1',
							params: [signinForm.email.value]
						});

						$rootScope.userCollection.$promise.then(function (user) {
							if (user.result) {
								if (user.result.length > 0) {
									localStorage.setItem('user_id', user.result[0].ID);
									localStorage.setItem('user_email', user.result[0].email);
									localStorage.setItem('user_firstname', user.result[0].firstname);
									localStorage.setItem('user_lastname', user.result[0].lastname);
									localStorage.setItem('user_title', user.result[0].title);
									$rootScope.user = user.result[0];
									$state.go('user.Profile');
								} else {
									$scope.error = true;
									$scope.errorMessage = 'Can\'t find user\'s data';
									$scope.loading = false;
								}
							} else {
								$scope.error = true;
								$scope.errorMessage = 'Network error';
								$scope.loading = false;
							}
						});
					} else {
						$scope.error = true;
						$scope.errorMessage = 'Email or password is not correct';
						$scope.loading = false;
					}
				});
			};
		}
	]);
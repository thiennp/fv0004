'use strict';
kuvenoApp
	.controller('SignInCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'$wakanda',
		'AuthSrv',
		function ($rootScope, $scope, $state, $wakanda, AuthSrv) {
			$scope.facebookLogin = function () {
				return AuthSrv.facebookLogin();
			};
			$scope.linkedinLogin = function () {};
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
									if (user.result[0].ID) {
										localStorage.setItem('user_id', user.result[0].ID);
									}
									if (user.result[0].email) {
										localStorage.setItem('user_email', user.result[0].email);
									}
									if (user.result[0].firstname) {
										localStorage.setItem('user_firstname', user.result[0].firstname);
									}
									if (user.result[0].lastname) {
										localStorage.setItem('user_lastname', user.result[0].lastname);
									}
									if (user.result[0].title) {
										localStorage.setItem('user_title', user.result[0].title);
									}
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
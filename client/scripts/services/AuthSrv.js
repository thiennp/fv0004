'use strict';
kuvenoApp
	.factory('AuthSrv', [
		'$http',
		'$location',
		'$q',
		'$rootScope',
		'$state',
		'$wakanda',
		'AssistSrv',
		'Facebook',
		function ($http, $location, $q, $rootScope, $state, $wakanda, AssistSrv, Facebook) {
			return {
				verify: function () {
					var defer = $q.defer();
					if (localStorage.user_id === void 0) {
						defer.resolve(false);
						$state.go('auth.SignIn');
					} else {
						$rootScope.user = this.getUserData();
						var itv = setInterval(function () {
							if ($rootScope.wakandaInit) {
								$rootScope.userCollection = $wakanda.$ds.User.$find({
									filter: 'ID == :1',
									params: [localStorage.user_id]
								});
								$rootScope.userCollection.$promise.then(function (data) {
									if (data.result) {
										if (data.result[0]) {
											$rootScope.currentUser = data.result[0];
											if (!localStorage.user_firstname || !localStorage.user_lastname) {
												$state.go('user.ProfileUpdate');
											}
											defer.resolve(true);
										} else {
											defer.resolve(false);
											$state.go('auth.SignIn');
										}
									} else {
										defer.resolve(false);
										$state.go('auth.SignIn');
									}
								});
								clearInterval(itv);
							}
						}, 100);
					}
					return defer.promise;
				},
				verifyAuthen: function () {
					var _self = this;
					var itv = setInterval(function () {
						if ($rootScope.wakandaInit) {
							clearInterval(itv);
							if (localStorage.user_id !== void 0) {
								$rootScope.user = _self.getUserData();
								if (localStorage.user_firstname && localStorage.user_lastname) {
									$location.path('#/user/profile');
								} else {
									$location.path('#/user/profile_update');
								}
							}
						}
					}, 100);
				},
				facebookLogin: function () {
					var getFacebookInformation, storeUser;
					storeUser = function (response) {
						var defer = $q.defer();
						$rootScope.user = response;
						AssistSrv.localeToCountry(response.locale).then(function (data) {
							localStorage.setItem('user_facebook_id', response.id);
							localStorage.setItem('user_firstname', response.first_name);
							localStorage.setItem('user_lastname', response.last_name);
							localStorage.setItem('user_link', response.link);
							localStorage.setItem('user_locale', response.locale);
							localStorage.setItem('user_name', response.name);
							localStorage.setItem('user_timezone', response.timezone);
							localStorage.setItem('user_updated_time', response.updated_time);
							localStorage.setItem('user_verified', response.verified);
							localStorage.setItem('user_avatar', 'http://graph.facebook.com/' + response.id + '/picture');
							localStorage.setItem('user_country', data);
							$rootScope.user.country = localStorage.getItem('user_country');
							$rootScope.user.picture = localStorage.getItem('user_picture');
							defer.resolve($rootScope.user);
						});
						return defer.promise;
					};
					getFacebookInformation = function () {
						return Facebook.api('/me', function (response) {
							var newUser = $wakanda.$ds.User.signUpNewFBUser(response.id);
							$wakanda.$login(response.id, 'FB-login').then(function (data) {
								if (data.result) {
									$wakanda.$currentUser().then(function (user) {
										var currentUser = $wakanda.$ds.User.$findOne(user.result.ID);
										currentUser.$promise.then(function () {
											localStorage.setItem('user_id', user.ID);
											localStorage.setItem('user_email', user.email);
											localStorage.setItem('user_title', user.title);
											storeUser(response);
											$state.go('user.Profile');
										});
									});
								} else {
									console.log(data);
								}
							});
						});
					};
					Facebook.getLoginStatus(function (response) {
						if (response.status === 'connected') {
							$rootScope.loggedIn = true;
						} else {
							$rootScope.loggedIn = false;
						}
						if ($rootScope.loggedIn === false) {
							Facebook.login(function (response) {
								if (response.status === 'connected') {
									$rootScope.loggedIn = true;
								} else {
									$rootScope.loggedIn = false;
								}
								if ($rootScope.loggedIn) {
									getFacebookInformation();
								} else {
									$rootScope.facebookLoginError = true;
								}
							});
						} else {
							getFacebookInformation();
						}
					});
				},
				checkPassword: function (password) {
					var defer = $q.defer();
					if (!localStorage.getItem('user_facebook_id')) {
						$wakanda.$loginByPassword(localStorage.getItem('user_email'), password).then(function (loginResult) {
							defer.resolve(loginResult.result);
						});
					} else {
						defer.resolve(true);
					}
					return defer.promise;
				},
				changePassword: function (password) {
					var defer = $q.defer();
					$rootScope.userCollection.$promise.then(function (user) {
						user.result[0].password = password;
						user.result[0].$save();
						defer.resolve(true);
					});
					return defer.promise;
				},
				getUserData: function () {
					var user = {
						'id': localStorage.getItem('user_id'),
						'email': localStorage.getItem('user_email'),
						'title': localStorage.getItem('user_title'),
						'facebook_id': localStorage.getItem('user_facebook_id'),
						'firstname': localStorage.getItem('user_firstname'),
						'lastname': localStorage.getItem('user_lastname'),
						'link': localStorage.getItem('user_link'),
						'locale': localStorage.getItem('user_locale'),
						'name': localStorage.getItem('user_name'),
						'timezone': localStorage.getItem('user_timezone'),
						'updated_time': localStorage.getItem('user_updated_time'),
						'verified': localStorage.getItem('user_verified'),
						'avatar': localStorage.getItem('user_avatar'),
						'country': localStorage.getItem('user_country')
					};
					if (!user.avatar) {
						user.avatar = '/images/profile.png';
					}
					return user;
				}
			};
		}
	]);
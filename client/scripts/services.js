'use strict';
angular.module('app.services', [])

.factory('Auth', [
	'$http',
	'$q',
	'$rootScope',
	'$state',
	'$wakanda',
	'Assist',
	'Facebook',
	function ($http, $q, $rootScope, $state, $wakanda, Assist, Facebook) {
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
							defer.resolve(true);
							clearInterval(itv);
						}
					}, 100);
				}
				return defer.promise;
			},
			linkedin: function (code) {
				$http.post('https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code=code&redirect_uri=https://thiepcuoiviet.net/freelance/fv0004/dist&client_id=7581d2bszc4sid&client_secret=oDYszogper1pau5d').success(function (data, status, headers, config) {
					console.log(data);
				}).error(function (data, status, headers, config) {
					$rootScope.error = data;
					$state.go('auth.SignIn');
				});
			},
			facebookLogin: function () {
				var getFacebookInformation, storeUser;
				storeUser = function (response) {
					var defer = $q.defer();
					$rootScope.user = response;
					Assist.localeToCountry(response.locale).then(function (data) {
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
						$wakanda.$login(response.id, "FB-login").then(function (data) {
							if (data.result) {
								$wakanda.$currentUser().then(function (user) {
									var user = $wakanda.$ds.User.$findOne(user.result.ID)
									user.$promise.then(function () {
										localStorage.setItem('user_id', user.ID);
										localStorage.setItem('user_email', user.email);
										localStorage.setItem('user_title', user.title);
										storeUser(response);
										$state.go('user.Profile');
									})
								});
							} else {
								console.log(data);
							};
						})
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
				defer.resolve(true);
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
					user.avatar = '/images/profile.png'
				}
				return user;
			}
		};
	}
])

.factory('User', [
	'$http',
	'$q',
	'$rootScope',
	'$state',
	'Facebook',
	function ($http, $q, $rootScope, $state, Facebook) {
		var defer;
		return {
			sendFeedback: function (title, content) {
				defer = $q.defer();
				defer.resolve(true);
				return defer.promise;
			},
			getFacebookFollower: function (uid) {
				defer = $q.defer();
				Facebook.api('/uid', function (response) {
					defer.resolve(response);
				})
				return defer.promise;
			}
		};
	}
])

.factory('Assist', [
	'$http',
	'$q',
	function ($http, $q) {
		return {
			localeToCountry: function (locale) {
				var defer = $q.defer();
				$http.get('scripts/vendors/FacebookLocales.json').success(function (data, status, headers, config) {
					var item, _i, _len, _ref, _results;
					_ref = data.locales.locale;
					_results = [];
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						item = _ref[_i];
						if (item.codes.code.standard.representation === locale) {
							if (item.englishName.split('(').length > 1) {
								defer.resolve(item.englishName.split('(')[1].split(')')[0]);
							} else {
								defer.resolve(item.englishName);
							}
							break;
						} else {
							_results.push(void 0);
						}
					}
					defer.resolve(_results);
				}).error(function (data, status, headers, config) {
					defer.reject(data);
				});
				return defer.promise;
			},
			validateEmail: function (email) {
				var re;
				re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(email);
			}
		};
	}
]);
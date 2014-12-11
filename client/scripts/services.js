'use strict';
angular.module('app.services', []).factory('Auth', [
	'$http', '$q', '$rootScope', '$state', '$wakanda', 'Assist', 'Facebook',
	function ($http, $q, $rootScope, $state, $wakanda, Assist, Facebook) {
		var defer;
		defer = $q.defer();
		return {
			verify: function () {
				if (localStorage.user_id === void 0) {
					defer.resolve(false);
					$state.go('auth.SignIn');
				} else {
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
				return $http.post('https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code=code&redirect_uri=https://thiepcuoiviet.net/freelance/fv0004/dist&client_id=7581d2bszc4sid&client_secret=oDYszogper1pau5d').success(function (data, status, headers, config) {
					return console.log(data);
				}).error(function (data, status, headers, config) {
					$rootScope.error = data;
					return $state.go('auth.SignIn');
				});
			},
			login: function (username, password) {
				var newUser;
				newUser = $wakanda.$ds.User.signUpNewUser("my@email.com", "myPassword");
				defer.resolve(true);
				return defer.promise;
			},
			facebookLogin: function () {
				var getFacebookInformation, storeUser;
				storeUser = function (response) {
					$rootScope.user = response;
					Assist.localeToCountry(response.locale).then(function (data) {
						localStorage.setItem('user_id', response.id);
						localStorage.setItem('user_first_name', response.first_name);
						localStorage.setItem('user_last_name', response.last_name);
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
						return defer.resolve($rootScope.user);
					});
					return defer.promise;
				};
				getFacebookInformation = function () {
					return Facebook.api('/me', function (response) {
						var newUser;
						storeUser(response);
						newUser = $wakanda.$ds.User.signUpNewFBUser(response.id);
						return $state.go('user.Profile');
					});
				};
				return Facebook.getLoginStatus(function (response) {
					if (response.status === 'connected') {
						$rootScope.loggedIn = true;
					} else {
						$rootScope.loggedIn = false;
					}
					if ($rootScope.loggedIn === false) {
						return Facebook.login(function (response) {
							if (response.status === 'connected') {
								$rootScope.loggedIn = true;
							} else {
								$rootScope.loggedIn = false;
							}
							if ($rootScope.loggedIn) {
								return getFacebookInformation();
							} else {
								return $rootScope.facebookLoginError = true;
							}
						});
					} else {
						return getFacebookInformation();
					}
				});
			},
			checkPassword: function (password) {
				defer.resolve(true);
				return defer.promise;
			},
			changePassword: function (password) {
				defer.resolve('done');
				return defer.promise;
			}
		};
	}
]).factory('User', [
	'$http', '$q', '$rootScope', '$state',
	function ($http, $q, $rootScope, $state) {
		var defer;
		defer = $q.defer();
		return {
			sendFeedback: function (title, content) {
				defer.resolve(true);
				return defer.promise;
			}
		};
	}
]).factory('Assist', [
	'$http', '$q',
	function ($http, $q) {
		var defer;
		defer = $q.defer();
		return {
			localeToCountry: function (locale) {
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
					return _results;
				}).error(function (data, status, headers, config) {
					return defer.reject(data);
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
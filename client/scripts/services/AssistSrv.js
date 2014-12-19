'use strict';
kuvenoApp
	.factory('AssistSrv', [
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
				},
				timeToString: function (time) {
					var date = time.getDate();
					if (date < 10) {
						date = '0' + date;
					}
					var month = time.getMonth() + 1;
					if (month < 10) {
						month = '0' + month;
					}
					var year = time.getFullYear();
					return date + '/' + month + '/' + year;
				}
			};
		}
	]);
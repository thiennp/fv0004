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
				timeToString: function (timeValue) {
					var str = '';
					var addedStr = '';
					if (timeValue < 0) {
						addedStr = ' ago';
						timeValue = -timeValue;
					}
					var day, hour, min, remain;
					if (timeValue >= 86400000) {
						day = Math.floor(timeValue / 86400000);
						remain = timeValue - day * 86400000;
						str += day + 'd ';
					} else {
						day = 0;
						remain = timeValue;
					}

					if (remain >= 3600000) {
						hour = Math.floor(remain / 3600000);
						remain = remain - hour * 3600000;
						str += hour + 'h ';
					} else {
						hour = 0;
					}

					if (day === 0) {
						if (remain >= 60000) {
							min = Math.floor(remain / 60000);
							remain = remain - min * 60000;
							str += min + 'm ';
						} else {
							min = 0;
						}
					}

					if (day !== 0 || hour !== 0 || min !== 0) {
						str += addedStr;
					} else {
						str = 'now';
					}
					return str;
				}
			};
		}
	]);
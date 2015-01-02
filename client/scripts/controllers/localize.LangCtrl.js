'use strict';
kuvenoApp
	.controller('LangCtrl', [
		'$scope',
		'$translate',
		'$rootScope',
		function ($scope, $rootScope, $translate) {
			$scope.lang = localStorage.getItem('lang');
			$scope.changeLang = function (key, locale) {
				$scope.lang = key;
				$translate.use(key);
				localStorage.setItem('lang', key);
				localStorage.setItem('locale', locale);
				moment.locale(locale);
				console.log(moment.localeData());
			};
		}
	]);
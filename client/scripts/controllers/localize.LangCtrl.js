'use strict';
kuvenoApp
	.controller('LangCtrl', [
		'$scope',
		'$translate',
		function ($scope, $translate) {
			$scope.lang = localStorage.getItem('lang');
			$scope.changeLang = function (key) {
				$scope.lang = key;
				localStorage.setItem('lang', key);
				$translate.use(key).then(function (key) {}, function (key) {});
			};
		}
	]);
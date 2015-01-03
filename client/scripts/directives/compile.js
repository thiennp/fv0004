'use strict';
kuvenoApp
	.directive('compile', [
		'$compile',
		'$rootScope',
		function ($compile, $rootScope) {
			return function (scope, element, attrs) {
				$rootScope.$watch(
					function ($rootScope) {
						return $rootScope.$eval(attrs.compile);
					},
					function (value) {
						element.html(value);
						$compile(element.contents())(scope);
					}
				);
			};
		}
	]);
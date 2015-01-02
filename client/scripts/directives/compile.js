'use strict';
kuvenoApp
	.directive('compile', [
		'$compile',
		'$rootScope',
		function ($compile, $rootScope) {
			return function (scope, element, attrs) {
				$rootScope.$watch(
					function ($rootScope) {
						// watch the 'compile' expression for changes
						console.log(attrs.compile);
						console.log($rootScope.$eval(attrs.compile));
						return $rootScope.$eval(attrs.compile);
					},
					function (value) {
						// when the 'compile' expression changes
						// assign it into the current DOM
						element.html(value);
						console.log(value);
						// compile the new DOM and link it to the current
						// scope.
						// NOTE: we only compile .childNodes so that
						// we don't get into infinite loop compiling ourselves
						$compile(element.contents())($rootScope);
					}
				);
			};
		}
	]);
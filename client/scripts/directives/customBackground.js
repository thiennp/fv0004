'use strict';
kuvenoApp
	.directive('customBackground', function () {
		return {
			restrict: 'A',
			controller: [
				'$scope', '$element', '$location',
				function ($scope, $element, $location) {
					var addBg, path;
					path = function () {
						return $location.path();
					};
					addBg = function (path) {
						$element.removeClass('body-home body-special body-tasks body-lock');
						switch (path) {
						case '/':
							return $element.addClass('body-home');
						case '/auth/sign_in':
						case '/auth/sign_up':
							return $element.addClass('body-special');
						case '/tasks':
							return $element.addClass('body-tasks');
						}
					};
					addBg($location.path());
					return $scope.$watch(path, function (newVal, oldVal) {
						if (newVal === oldVal) {
							return;
						}
						return addBg($location.path());
					});
				}
			]
		};
	});
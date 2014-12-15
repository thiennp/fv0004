'use strict';
kuvenoApp
	.directive('toggleMinNav', [
		'$rootScope',
		function ($rootScope) {
			return {
				restrict: 'A',
				link: function (scope, ele, attrs) {
					var $window, Timer, app, updateClass;
					app = $('#app');
					$window = $(window);
					ele.on('click', function (e) {
						if (app.hasClass('nav-min')) {
							app.removeClass('nav-min');
						} else {
							app.addClass('nav-min');
							$rootScope.$broadcast('minNav:enabled');
						}
						return e.preventDefault();
					});
					Timer = void 0;
					updateClass = function () {
						var width;
						width = $window.width();
						if (width < 768) {
							return app.removeClass('nav-min');
						}
					};
					return $window.resize(function () {
						var t;
						clearTimeout(t);
						t = setTimeout(updateClass, 300);
					});
				}
			};
		}
	]);
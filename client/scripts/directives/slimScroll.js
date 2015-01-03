'use strict';
kuvenoApp
	.directive('slimScroll',
		function () {
			return {
				restrict: 'A',
				link: function (scope, ele, attrs) {
					return ele.slimScroll({
						height: '100%'
					});
				}
			};
		}
);
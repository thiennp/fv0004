'use strict';
kuvenoApp
	.directive('inputAutocomplete', function () {
		return {
			restrict: 'C',
			template: '<div class="label-autocomplete" ng-repeat="item in sendAgendaTo">{{item.name}}, </div><input class="autocomplete-text" type="text" />',
			controller: [
				'$scope', '$element', '$attrs', '$location',
				function ($scope, $element, $attrs, $location) {
					var el = $element[0];
					var input = el.getElementsByClassName('autocomplete-text')[0];
					$element.on('mousedown', function (event) {
						input.focus();
					});
					$(input).on('keyup', function (event) {
						if (event.keyCode === 188) {
							var addedItem = {};
							addedItem.name = $(input).val().split(',')[0];
							addedItem[$attrs.ngDataShow] = $(input).val().split(',')[0];
							$scope[$attrs.ngDataRepeat].push(addedItem);
							$scope.$apply();
							console.log($scope[$attrs.ngDataRepeat]);
							$(input).val('');
						}
					});
				}
			]
		};
	});
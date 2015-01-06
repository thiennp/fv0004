'use strict';
kuvenoApp
	.directive('inputAutocomplete', function () {
		return {
			restrict: 'C',
			scope: {
				listItem: '=ngDataRepeat'
			},
			template: '<div class="label-autocomplete" ng-repeat="item in listItem">{{item.name}}, </div><input class="autocomplete-text" type="text" />',
			controller: [
				'$attrs', '$element', '$rootScope',
				function ($attrs, $element, $rootScope) {
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
							console.log($attrs.ngDataRepeat);
							$rootScope[$attrs.ngDataRepeat].push(addedItem);
							$rootScope.$apply();
							console.log($rootScope[$attrs.ngDataRepeat]);
							$(input).val('');
						}
					});
				}
			]
		};
	});
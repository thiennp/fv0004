'use strict';
kuvenoApp
	.directive('inputAutocomplete', [
		'$rootScope',
		'$filter',
		function ($rootScope, $filter) {
			var template = '';
			template += '{{calculateSuggest()}}';
			template += '<div';
			template += '	class="label-autocomplete"';
			template += '	ng-class="{active: item.active}"';
			template += '	ng-click="addActive(item)"';
			template += '	ng-repeat="item in listItem">';
			template += '	{{showItem(item)}}';
			template += '	<span ng-hide="item.active">, </span>';
			template += '	<span';
			template += '		ng-show="item.active"';
			template += '		ng-click="removeItem(item)">&nbsp;&nbsp;<i class="fa fa-times"></i>&nbsp;</span>';
			template += '</div>';
			template += '<input';
			template += '	class="autocomplete-text"';
			template += '	type="text"';
			template += '	ng-model="filterInput"';
			template += '	ng-focus="inputFocus" />';
			template += '<ul class="input-suggestion" style="{{calculateTop()}}" ng-show="filterInput">';
			template += '	<li';
			template += '		class="input-suggestion-item"';
			template += '		ng-repeat="(index, item) in listSuggest | filter:filterInput"';
			template += '		ng-click="addItem(item)"';
			template += '		ng-class="{active: index==suggestActiveIndex}">';
			template += '		{{showSuggest(item)}}';
			template += '	</li>';
			template += '</ul>';
			return {
				restrict: 'C',
				scope: {
					dataRepeat: '=ngDataRepeat',
					dataShow: '=ngDataShow',
					dataSuggest: '=ngDataSuggest',
					dataSuggestShow: '=ngDataSuggestShow'
				},
				template: template,
				link: function ($scope, $element, $attrs) {
					var el = $element[0],
						input = el.getElementsByClassName('autocomplete-text')[0],
						suggestionItems = el.getElementsByClassName('input-suggestion-item'),
						dataRepeat = $attrs.ngDataRepeat,
						dataSuggest = $attrs.ngDataSuggest,
						dataShow = $attrs.ngDataShow,
						dataSuggestShow = $attrs.ngDataSuggestShow,
						addItemFromSuggestion = function (item) {
							if ($scope.listSuggest[$scope.suggestActiveIndex]) {
								$rootScope[$attrs.ngDataRepeat].push($scope.listSuggest[$scope.suggestActiveIndex]);
								$rootScope.$apply();
								$scope.filterInput = null;
								$scope.$apply();
							}
						},
						removeLastLabel = function () {
							if ($rootScope[dataRepeat].length > 0) {
								if ($rootScope[dataRepeat][$rootScope[dataRepeat].length - 1].active) {
									$rootScope[dataRepeat].splice($rootScope[dataRepeat].length - 1, 1);
								} else {
									$rootScope[dataRepeat][$rootScope[dataRepeat].length - 1].active = true;
								}
								$scope.$apply();
							}
						};
					$scope.inputFocus = true;
					$scope.suggestActiveIndex = 0;
					$scope.inputNull = true;
					$scope.addActive = function (item) {
						item.active = !item.active;
					};
					$scope.showItem = function (item) {
						return item[dataShow];
					};
					$scope.showSuggest = function (item) {
						return item[dataShow] + '<' + item[$attrs.ngDataSuggestShow] + '>';
					};
					$scope.addItem = function (item) {
						$rootScope[dataRepeat].push(item);
						$scope.listItem = $rootScope[dataRepeat];
						$scope.filterInput = null;
					};
					$scope.removeItem = function (item) {
						for (var i in $rootScope[dataRepeat]) {
							if ($rootScope[dataRepeat][i] === item) {
								item.active = false;
								$rootScope[dataRepeat].splice(i, 1);
								break;
							}
						}
					};
					$scope.calculateTop = function () {
						var positionTop = 6;
						if ($attrs.ngDataSuggestTop) {
							positionTop += Number($attrs.ngDataSuggestTop);
						}
						var style = 'top: ' + ($element.height() + positionTop) + 'px;';
						return style;
					};
					$scope.calculateSuggest = function () {
						$scope.listItem = $rootScope[dataRepeat];
						$scope.listSuggest = $rootScope[dataSuggest];
						var newList = [];
						if ($scope.filterInput) {
							for (var i in $rootScope[dataSuggest]) {
								var check = true;
								var itemSuggest = $rootScope[dataSuggest][i];
								if (itemSuggest[dataSuggestShow]) {
									if (itemSuggest[dataSuggestShow].indexOf($scope.filterInput) === -1) {
										check = false;
									} else {
										for (var j in $rootScope[dataRepeat]) {
											var itemRepeat = $rootScope[dataRepeat][j];
											if (itemRepeat && itemSuggest) {
												if (itemRepeat[dataShow] === itemSuggest[dataShow]) {
													check = false;
													break;
												}
											}
										}
									}
								} else {
									check = false;
								}
								if (check) {
									newList.push(itemSuggest);
								}
							}
						}
						$scope.listSuggest = newList;
						return;
					};
					$element.on('mousedown', function (event) {
						input.focus();
					});
					$(input).on('keydown', function (event) {
						if ($scope.filterInput) {
							$scope.inputNull = false;
						} else {
							$scope.inputNull = true;
						}
					});
					$(input).on('keyup', function (event) {
						switch (event.keyCode) {

							// _comma, _semicolon
						case 188:
						case 186:
							$scope.filterInput = $scope.filterInput.substring(0, $scope.filterInput.length - 1);
							if ($scope.filterInput) {
								var addedItem = {};
								addedItem.name = $scope.filterInput;
								addedItem.email = $scope.filterInput;
								addedItem[$attrs.ngDataShow] = $scope.filterInput;
								$rootScope[$attrs.ngDataRepeat].push(addedItem);
								$rootScope.$apply();
								$scope.filterInput = null;
								$scope.$apply();
							} else {
								$scope.$apply();
							}
							break;

							// _backspace
						case 8:
							if (!$scope.filterInput && $scope.inputNull) {
								removeLastLabel();
							}
							break;

							// _enter
						case 13:
							addItemFromSuggestion();
							break;

							// _downarrow
						case 40:
							if ($scope.suggestActiveIndex < $scope.listSuggest.length - 1) {
								$scope.suggestActiveIndex++;
							} else {
								$scope.suggestActiveIndex = 0;
							}
							break;

							// _uparrow
						case 38:
							if ($scope.suggestActiveIndex > 0) {
								$scope.suggestActiveIndex--;
							} else {
								$scope.suggestActiveIndex = $scope.listSuggest.length - 1;
							}
							break;
						default:
							$scope.suggestActiveIndex = 0;
							break;
						}
					});
				}
			};
		}
	]);
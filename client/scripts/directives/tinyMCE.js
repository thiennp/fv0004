'use strict';
kuvenoApp
	.value('uiTinymceConfig', {})
	.directive('uiTinymce', [
		'$q',
		'$rootScope',
		'$timeout',
		'$translate',
		'$wakanda',
		'DataSrv',
		'uiTinymceConfig',
		function ($q, $rootScope, $timeout, $translate, $wakanda, DataSrv, uiTinymceConfig) {
			uiTinymceConfig = uiTinymceConfig || {};
			var generatedIds = 0;
			return {
				priority: 10,
				require: 'ngModel',
				link: function ($scope, elm, attrs, ngModel) {
					var expression, options, tinyInstance,
						updateView = function () {
							ngModel.$setViewValue(elm.val());
							if (!$scope.$root.$$phase) {
								$scope.$apply();
							}
						},
						createAssigneeElement = function (user) {
							return $('<span>', {
								// data-mce-contenteditable: false does not appear if element is created inside the dialog (wat)
								'data-id': user.id,
								class: 'assignee mceNonEditable',
								'data-mce-contenteditable': false,
								'title': 'Owner:' + user.name
							}).text(user.name);
						},
						createUserElement = function (user) {
							return $('<span>', {
								'data-id': user.id,
								class: 'user mceNonEditable',
								'data-mce-contenteditable': false,
								'title': 'User: ' + user.name
							}).text(user.name);
						},
						createDeadlineElement = function (deadline) {
							return $(' <span>', {
								'data-date': deadline,
								class: 'deadline mceNonEditable',
								'data-mce-contenteditable': false,
								'title': 'Due: ' + deadline
							}).text(deadline);
						};
					// generate an ID if not present
					if (!attrs.id) {
						attrs.$set('id', 'uiTinymce' + generatedIds++);
					}

					if (attrs.uiTinymce) {
						expression = $scope.$eval(attrs.uiTinymce);
					} else {
						expression = {};
					}

					DataSrv.getData('User').then(function (data) {
						var users = [];
						for (var i in data) {
							users.push({
								'id': data[i].ID,
								'name': data[i].name
							});
						}
						console.log(users);
						options = {
							skin: 'kuveno',
							menubar: false,
							style_formats: [{
								title: 'Heading',
								block: 'h1'
							}, {
								title: 'Item heading',
								block: 'h2'
							}, {
								title: 'Sub heading',
								block: 'h3'
							}],
							language: $rootScope.lang,
							toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent link | task | decision',
							statusbar: false,
							plugins: 'noneditable link mention paste autolink',
							content_css: 'bower_components/tinymce/css/styles.css',
							mentions: {
								source: users,
								insert: function (item) {
									return createUserElement(item).get(0).outerHTML;
								}
							},
							setup: function (ed) {
								var args;
								$translate.use($rootScope.lang);
								ed.addButton('task', {
									text: $translate.instant('Task'),
									icon: 'clipboard',
									tooltip: $translate.instant('New task'),
									// onclick: createOnClickCallback('task')
								});

								ed.addButton('decision', {
									text: $translate.instant('Decision'),
									tooltip: $translate.instant('New decision'),
									icon: 'hammer',
									// onclick: createOnClickCallback('decision')
								});

								ed.on('init', function (args) {
									ed.getBody().setAttribute('spellcheck', true);
									ngModel.$render();
								});
								// Update model on button click
								ed.on('ExecCommand', function (e) {
									ed.save();
									updateView();
								});
								// Update model on keypress
								ed.on('KeyUp', function (e) {
									ed.save();
									updateView();
								});
								// Update model on change, i.e. copy/pasted text, plugins altering content
								ed.on('SetContent', function (e) {
									if (!e.initial) {
										ed.save();
										updateView();
									}
								});
							},
							mode: 'exact',
							elements: attrs.id
						};
						// extend options with initial uiTinymceConfig and options from directive attribute value
						angular.extend(options, uiTinymceConfig, expression);
						$timeout(function () {
							tinymce.init(options);
						});
					});

					ngModel.$render = function () {
						if (!tinyInstance) {
							tinyInstance = tinymce.get(attrs.id);
						}
						if (tinyInstance) {
							tinyInstance.setContent(ngModel.$viewValue || '');
						}
					};

					$rootScope.$on('changeLang', function () {
						options.language = $rootScope.lang;
						var textArea = $rootScope.textAreaList;
						for (var i in textArea) {
							$rootScope.textAreaList[i] = $rootScope.textAreaList[i] + '<span></span>';
						}
						tinymce.init(options);
					});
				}
			};
		}
	]);
'use strict';
kuvenoApp
	.value('uiTinymceConfig', {})
	.directive('uiTinymce', [
		'$q',
		'$rootScope',
		'$timeout',
		'$translate',
		'$modal',
		'DataSrv',
		'uiTinymceConfig',
		function ($q, $rootScope, $timeout, $translate, $modal, DataSrv, uiTinymceConfig) {
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
						createUserElement = function (user) {
							return $('<span>', {
								'data-id': user.id,
								class: 'user mceNonEditable',
								'data-mce-contenteditable': false,
								'title': 'User: ' + user.name
							}).text(user.name);
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

					DataSrv.getData('User').then(function (response) {
						var users = [];
						for (var i in response) {
							users.push({
								'id': response[i].ID,
								'name': response[i].name
							});
						}
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
							content_css: 'styles/main.css',
							mentions: {
								source: users,
								insert: function (item) {
									return createUserElement(item).get(0).outerHTML;
								}
							},
							setup: function (ed) {
								var args,
									isParagraph = function (element) {
										return element.nodeName === 'P';
									},
									isTask = function (className) {
										return className === 'task';
									},
									isChildOfParagraph = function (element) {
										return isParagraph(element.parentNode);
									},
									isEmptyCustomElement = function ($element) {
										return isCustomElement($element) && $element.text() === '';
									},
									isCustomElement = function ($element) {
										return ($element.hasClass('task') || $element.hasClass('decision'));
									},
									isEnterKey = function (keyCode) {
										return keyCode === 13;
									},
									isTaskItem = function (element) {
										return $(element).hasClass('task-item');
									},
									userToListboxElement = function (user) {
										return {
											text: user.name,
											value: user.id
										};
									},
									cleanTask = function (element) {
										$(element).removeClass();
										var html = $(element).find('.task-description').html();
										$(element).html(html);
									},
									cleanUpAndSetDecision = function (element) {
										var $element = $(element);
										if ($element.hasClass('decision')) {
											$element.removeClass();
										} else {
											if ($element.hasClass('task')) {
												cleanTask(element);
											}
											$element.removeClass();
											$element.addClass('callout callout-danger decision');
										}
									},
									cleanUpAndSetTask = function (element) {
										var $element = $(element);
										var $assignee = $element.find('.assignee');
										var $user = $element.find('.user');
										var $deadline = $element.find('.deadline');
										var id = 'task-' + Math.floor(Math.random() * 1000000);
										if ($element.hasClass('task')) {
											cleanTask(element);
											if (!_.isEmpty($assignee.html())) {
												if ($assignee.hasClass('user')) {
													$assignee.removeClass('assignee');
												} else {
													$assignee.remove();
												}
											}
											$deadline.remove();
										} else {
											$rootScope.addedTaskDescription = $element.text();
											$rootScope.addedTaskOwners = response;
											$rootScope.addedTaskOwner = response[0];
											$rootScope.addedTaskDuedate = moment().add(7, 'days').format('DD/MM/YYYY');
											$rootScope.taskModalId = id;
											$modal.open({
												templateUrl: attrs.taskModal,
												controller: attrs.taskController
											});
											$rootScope.$on('addTinyMCETask' + id, function () {
												$element.removeClass();
												$element.addClass('task callout callout-success');
												$element.attr('data-id', id);
												$element.html('<div class="col-xs-3 task-item">' + $rootScope.addedTaskOwner.name + '</div><div class="col-xs-6 task-item task-description">' + $rootScope.addedTaskDescription + '</div><div class="col-xs-3 task-item">' + $rootScope.addedTaskDuedate + '</div><div class="clearfix"></div>');
												elm.val($element.closest('body').html());
												updateView();
											});
											$rootScope.$on('removeTinyMCETask' + id, function () {
												$element.remove();
												elm.val($element.closest('body').html());
												updateView();
											});
										}
									},
									getCurrentSelectionNode = function () {
										return ed.selection.getNode();
									},
									createOnClickCallback = function (className) {
										return function () {
											var element = getCurrentSelectionNode();
											if (!isParagraph(element)) {
												if (!isChildOfParagraph(element)) {
													return;
												}
												element = element.parentNode;
											}
											if (isTask(className)) {
												cleanUpAndSetTask(element);
											} else {
												cleanUpAndSetDecision(element);
											}
										};
									},
									keydownEventHandler = function (e) {
										if (isEnterKey(e.keyCode)) {
											var currentElement = getCurrentSelectionNode();
											if (isTaskItem(currentElement)) {
												tinymce.dom.Event.cancel(e);
												$(currentElement).parent().after('<p></p>');
												var newTask = $(currentElement).parent().next();
												cleanUpAndSetTask(newTask[0]);
											}
											if (isParagraph(currentElement)) {
												var $element = $(currentElement);

												// If caret is inside an empty task/decision block, we remove the block if enter is pressed.
												if (isEmptyCustomElement($element)) {
													$element.removeAttr('class');

													// Keeps the caret on the spot
													tinymce.dom.Event.cancel(e);
												}
											}
										}
									};
								$translate.use($rootScope.lang);
								ed.addButton('task', {
									text: $translate.instant('Task'),
									tooltip: $translate.instant('New task'),
									icon: 'clipboard',
									onclick: createOnClickCallback('task')
								});

								ed.addButton('decision', {
									text: $translate.instant('Decision'),
									tooltip: $translate.instant('New decision'),
									icon: 'hammer',
									onclick: createOnClickCallback('decision')
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
								ed.on('keydown', keydownEventHandler);
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
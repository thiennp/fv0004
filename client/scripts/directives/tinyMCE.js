'use strict';
kuvenoApp
	.value('uiTinymceConfig', {})
	.directive('uiTinymce', [
		'$rootScope',
		'$timeout',
		'uiTinymceConfig',
		function ($rootScope, $timeout, uiTinymceConfig) {
			uiTinymceConfig = uiTinymceConfig || {};
			var generatedIds = 0;
			return {
				priority: 10,
				require: 'ngModel',
				link: function (scope, elm, attrs, ngModel) {
					var expression, options, tinyInstance,
						updateView = function () {
							ngModel.$setViewValue(elm.val());
							if (!scope.$root.$$phase) {
								scope.$apply();
							}
						};
					// generate an ID if not present
					if (!attrs.id) {
						attrs.$set('id', 'uiTinymce' + generatedIds++);
					}

					if (attrs.uiTinymce) {
						expression = scope.$eval(attrs.uiTinymce);
					} else {
						expression = {};
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
						content_css: 'bower_components/tinymce/css/styles.css',
						mentions: {},
						setup: function (ed) {
							var args;
							ed.addButton('task', {
								text: 'Task',
								icon: 'clipboard',
								tooltip: 'New task',
								// onclick: createOnClickCallback('task')
							});

							ed.addButton('decision', {
								text: 'Decision',
								tooltip: 'New decision',
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
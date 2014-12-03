'use strict';

angular.module('app', [
	# Angular modules
	'ngRoute'
	'ngAnimate'
	'ngCookies'

	# 3rd Party Modules
	'ui.bootstrap'
	'easypiechart'
	'mgo-angular-wizard'
	'textAngular'
	'angular-loading-bar'

	# Custom modules
	'app.ui.ctrls'
	'app.ui.directives'
	'app.ui.services'
	'app.controllers'
	'app.directives'
	'app.form.validation'
	'app.ui.form.ctrls'
	'app.ui.form.directives'
	'app.tables'
	'app.task'
	'app.localization'
	'app.chart.ctrls'
	'app.chart.directives'
	'pascalprecht.translate'
	'ui.router'
])

.run([
	'$rootScope'
	'$state'
	'$stateParams'
	($rootScope, $state, $stateParams) ->
		$rootScope.$state = $state
		$rootScope.$stateParams = $stateParams
])

.config([
	'$stateProvider'
	'$urlRouterProvider'
	($stateProvider, $urlRouterProvider) ->
		$urlRouterProvider.otherwise '/main'
		$stateProvider
			.state 'main',
				url: '/main'
				templateURL: 'views/main.html'
				controller: ($scope)->
])


.config(['$translateProvider', ($translateProvider)->
	$translateProvider.translations "en_US",
		TITLE: "How to use"
		HEADER: "You can translate texts by using a filter."
		SUBHEADER: "And if you don't like filters, you can use a directive."
		HTML_KEYS: "If you don't like an empty elements, you can write a key for the translation as an inner HTML of the directive."
		DATA_TO_FILTER: "Your translations might also contain any static ({{staticValue}}) or random ({{randomValue}}) values, which are taken directly from the model."
		DATA_TO_DIRECTIVE: "And it's no matter if you use filter or directive: static is still {{staticValue}} and random is still {{randomValue}}."
		RAW_TO_FILTER: "In case you want to pass a {{type}} data to the filter, you have only to pass it as a filter parameter."
		RAW_TO_DIRECTIVE: "This trick also works for {{type}} with a small mods."
		SERVICE: "Of course, you can translate your strings directly in the js code by using a $translate service."
		SERVICE_PARAMS: "And you are still able to pass params to the texts. Static = {{staticValue}}, random = {{randomValue}}."


	# Adding a translation table for the Russian language
	$translateProvider.translations "ru_RU",
		TITLE: "Как пользоваться"
		HEADER: "Вы можете переводить тексты при помощи фильтра."
		SUBHEADER: "А если Вам не нравятся фильтры, Вы можете воспользоваться директивой."
		HTML_KEYS: "Если вам не нравятся пустые элементы, Вы можете записать ключ для перевода в как внутренний HTML директивы."
		DATA_TO_FILTER: "Ваши переводы также могут содержать любые статичные ({{staticValue}}) или случайные ({{randomValue}}) значения, которые берутся прямо из модели."
		DATA_TO_DIRECTIVE: "И совершенно не важно используете ли Вы фильтр или директиву: статическое значение по прежнему {{staticValue}} и случайное - {{randomValue}}."
		RAW_TO_FILTER: "Если вы хотите передать \"сырые\" ({{type}}) данные фильтру, Вам всего лишь нужно передать их фильтру в качестве параметров."
		RAW_TO_DIRECTIVE: "Это также работает и для директив ({{type}}) с небольшими модификациями."
		SERVICE: "Конечно, Вы можете переводить ваши строки прямо в js коде при помощи сервиса $translate."
		SERVICE_PARAMS: "И вы все еще можете передавать параметры в тексты. Статическое значение = {{staticValue}}, случайное = {{randomValue}}."

	$translateProvider.preferredLanguage 'en_US'
	# $translateProvider.useLocalStorage()
])

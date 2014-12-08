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
	'app.services'
	'app.auth.controllers'
	'app.user.controllers'
	'app.action.controllers'
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
	'facebook'
])

.run([
	'$rootScope'
	'$state'
	'$stateParams'
	($rootScope, $state, $stateParams) ->
		$rootScope.$state = $state
		$rootScope.$stateParams = $stateParams
		$rootScope.$stateHistory = []
		$rootScope.onBack = false
		$rootScope.back = ->
			$rootScope.onBack = true
			if $rootScope.$stateHistory.length>1
				$state.go $rootScope.$stateHistory[$rootScope.$stateHistory.length-2]
				$rootScope.$stateHistory.pop()
])

.config (FacebookProvider)->
	FacebookProvider.init('1655840277976205');
	# FacebookProvider.init('771785776234961');

.config([
	'$stateProvider'
	'$urlRouterProvider'
	($stateProvider, $urlRouterProvider) ->
		$urlRouterProvider.otherwise '/main'
		$stateProvider
			.state 'main',
				url: '/main'
				templateUrl: 'views/main.html'

			.state 'auth',
				url: '/auth'
				templateUrl: 'views/auth.html'

			.state 'auth.SignUp',
				url: '/sign_up'
				templateUrl: 'views/auth/sign_up.html'

			.state 'auth.SignIn',
				url: '/sign_in'
				templateUrl: 'views/auth/sign_in.html'

			.state 'auth.ChangePassword',
				url: '/change_password'
				templateUrl: 'views/auth/change_password.html'

			.state 'auth.SignOut',
				url: '/sign_out'
				controller: ($state)->
					localStorage.removeItem 'user_id'
					localStorage.removeItem 'user_first_name'
					localStorage.removeItem 'user_last_name'
					localStorage.removeItem 'user_link'
					localStorage.removeItem 'user_locale'
					localStorage.removeItem 'user_name'
					localStorage.removeItem 'user_timezone'
					localStorage.removeItem 'user_updated_time'
					localStorage.removeItem 'user_verified'
					localStorage.removeItem 'user_avatar'
					localStorage.removeItem 'user_country'
					$state.go 'auth.SignIn'

			.state 'createMeetingNote',
				url: '/create_meeting_note'
				templateUrl: 'views/create_meeting_note.html'

			# Action group
			.state 'action',
				url: '/action'
				templateUrl: 'views/action.html'

			.state 'action.AgreeOnDate',
				url: '/agree_on_date'
				templateUrl: 'views/action/agree_on_date.html'

			.state 'action.CreateAgenda',
				url: '/create_agenda'
				templateUrl: 'views/action/create_agenda.html'

			.state 'action.ViewMeeting',
				url: '/view_meeting/:meetingId'
				templateUrl: 'views/action/view_meeting.html'

			.state 'action.ListAllMeeting',
				url: '/list_all_meeting'
				templateUrl: 'views/action/list_all_meeting.html'

			.state 'action.CreateEMeeting',
				url: '/create_e_meeting'
				templateUrl: 'views/action/create_e_meeting.html'

			.state 'action.ViewEMeeting',
				url: '/view_e_meeting/:eMeetingId'
				templateUrl: 'views/action/view_e_meeting.html'

			# User group
			.state 'user',
				url: '/user'
				templateUrl: 'views/user.html'

			.state 'user.Profile',
				url: '/profile'
				templateUrl: 'views/user/profile.html'

			.state 'user.SendFeedback',
				url: '/send_feedback'
				templateUrl: 'views/user/send_feedback.html'

			.state 'user.Groups',
				url: '/groups'
				templateUrl: 'views/user/groups.html'

			.state 'user.MyTask',
				url: '/my_task'
				templateUrl: 'views/user/my_task.html'

			.state 'user.UpcommingMeeting',
				url: '/upcomming_meeting'
				templateUrl: 'views/user/upcomming_meeting.html'
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

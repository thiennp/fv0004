'use strict';
angular

.module('app', [
	'ngRoute',
	'ngAnimate',
	'ngCookies',
	'ui.bootstrap',
	'app.controllers',
	'app.services',
	'app.auth.controllers',
	'app.user.controllers',
	'app.action.controllers',
	'app.directives',
	'app.localization',
	'pascalprecht.translate',
	'ui.router',
	'facebook',
	'wakanda'
])

.run([
	'$rootScope', '$state', '$stateParams', '$wakanda',
	function ($rootScope, $state, $stateParams, $wakanda) {
		var oninit;
		$rootScope.wakandaInit = false;
		$rootScope.$stateHistory = [];
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		$rootScope.onBack = false;
		$rootScope.back = function () {
			$rootScope.onBack = true;
			if ($rootScope.$stateHistory.length > 1) {
				$state.go($rootScope.$stateHistory[$rootScope.$stateHistory.length - 2]);
				$rootScope.$stateHistory.pop();
			}
		};
		$wakanda.init().then(oninit = function (ds) {
			$rootScope.initialized = "initialized";
			$rootScope.dataClasses = Object.keys(ds.getDataClasses());
			$rootScope.wakandaInit = true;
		});
	}
])

.config(function (FacebookProvider) {
	return FacebookProvider.init('1655840277976205');
})

.config([
	'$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/main');
		return $stateProvider.state('main', {
			url: '/main',
			templateUrl: 'views/main.html'
		}).state('auth', {
			url: '/auth',
			templateUrl: 'views/auth.html'
		}).state('auth.SignUp', {
			url: '/sign_up',
			templateUrl: 'views/auth/sign_up.html'
		}).state('auth.SignIn', {
			url: '/sign_in',
			templateUrl: 'views/auth/sign_in.html'
		}).state('auth.ChangePassword', {
			url: '/change_password',
			templateUrl: 'views/auth/change_password.html'
		}).state('auth.SignOut', {
			url: '/sign_out',
			controller: function ($state) {
				localStorage.removeItem('user_id');
				localStorage.removeItem('user_first_name');
				localStorage.removeItem('user_last_name');
				localStorage.removeItem('user_link');
				localStorage.removeItem('user_locale');
				localStorage.removeItem('user_name');
				localStorage.removeItem('user_timezone');
				localStorage.removeItem('user_updated_time');
				localStorage.removeItem('user_verified');
				localStorage.removeItem('user_avatar');
				localStorage.removeItem('user_country');
				return $state.go('auth.SignIn');
			}
		}).state('createMeetingNote', {
			url: '/create_meeting_note',
			templateUrl: 'views/create_meeting_note.html'
		}).state('action', {
			url: '/action',
			templateUrl: 'views/action.html'
		}).state('action.AgreeOnDate', {
			url: '/agree_on_date',
			templateUrl: 'views/action/agree_on_date.html'
		}).state('action.CreateAgenda', {
			url: '/create_agenda',
			templateUrl: 'views/action/create_agenda.html'
		}).state('action.ViewMeeting', {
			url: '/view_meeting/:meetingId',
			templateUrl: 'views/action/view_meeting.html'
		}).state('action.ListAllMeeting', {
			url: '/list_all_meeting',
			templateUrl: 'views/action/list_all_meeting.html'
		}).state('action.CreateEMeeting', {
			url: '/create_e_meeting',
			templateUrl: 'views/action/create_e_meeting.html'
		}).state('action.ViewEMeeting', {
			url: '/view_e_meeting/:eMeetingId',
			templateUrl: 'views/action/view_e_meeting.html'
		}).state('user', {
			url: '/user',
			templateUrl: 'views/user.html'
		}).state('user.Profile', {
			url: '/profile',
			templateUrl: 'views/user/profile.html'
		}).state('user.ProfileUpdate', {
			url: '/profile_update',
			templateUrl: 'views/user/profile_update.html'
		}).state('user.SendFeedback', {
			url: '/send_feedback',
			templateUrl: 'views/user/send_feedback.html'
		}).state('user.Groups', {
			url: '/groups',
			templateUrl: 'views/user/groups.html'
		}).state('user.MyTask', {
			url: '/my_task',
			templateUrl: 'views/user/my_task.html'
		}).state('user.UpcommingMeeting', {
			url: '/upcomming_meeting',
			templateUrl: 'views/user/upcomming_meeting.html'
		});
	}
])

.config([
	'$translateProvider',
	function ($translateProvider) {
		$translateProvider.useStaticFilesLoader({
			prefix: '/l10n/',
			suffix: '.json'
		});
		if (localStorage.getItem('lang') === null) {
			localStorage.setItem('lang', 'English');
		}
		$translateProvider.preferredLanguage(localStorage.getItem('lang'));
	}
]);
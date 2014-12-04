(function() {
  'use strict';
  angular.module('app', ['ngRoute', 'ngAnimate', 'ngCookies', 'ui.bootstrap', 'easypiechart', 'mgo-angular-wizard', 'textAngular', 'angular-loading-bar', 'app.ui.ctrls', 'app.ui.directives', 'app.ui.services', 'app.controllers', 'app.user.controllers', 'app.action.controllers', 'app.directives', 'app.form.validation', 'app.ui.form.ctrls', 'app.ui.form.directives', 'app.tables', 'app.task', 'app.localization', 'app.chart.ctrls', 'app.chart.directives', 'pascalprecht.translate', 'ui.router']).run([
    '$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      return $rootScope.$stateParams = $stateParams;
    }
  ]).config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/main');
      return $stateProvider.state('main', {
        url: '/main',
        templateUrl: 'views/main.html'
      }).state('createMeetingNote', {
        url: '/create_meeting_note',
        templateUrl: 'views/create_meeting_note.html'
      }).state('action', {
        url: '/action',
        templateUrl: 'views/action.html'
      }).state('action.agreeOnDate', {
        url: '/agree_on_date',
        templateUrl: 'views/action/agree_on_date.html'
      }).state('action.createAgenda', {
        url: '/create_agenda',
        templateUrl: 'views/action/create_agenda.html'
      }).state('action.viewMeeting', {
        url: '/view_meeting/:meetingId',
        templateUrl: 'views/action/view_meeting.html'
      }).state('action.listAllMeeting', {
        url: '/list_all_meeting',
        templateUrl: 'views/action/list_all_meeting.html'
      }).state('action.createEMeeting', {
        url: '/create_e_meeting',
        templateUrl: 'views/action/create_e_meeting.html'
      }).state('action.viewEMeeting', {
        url: '/view_e_meeting/:eMeetingId',
        templateUrl: 'views/action/view_e_meeting.html'
      }).state('user', {
        url: '/user',
        templateUrl: 'views/user.html'
      }).state('user.profile', {
        url: '/profile',
        templateUrl: 'views/user/profile.html'
      }).state('user.groups', {
        url: '/groups',
        templateUrl: 'views/user/groups.html'
      }).state('user.myTask', {
        url: '/my_task',
        templateUrl: 'views/user/my_task.html'
      }).state('user.upcommingMeeting', {
        url: '/upcomming_meeting',
        templateUrl: 'views/user/upcomming_meeting.html'
      });
    }
  ]).config([
    '$translateProvider', function($translateProvider) {
      $translateProvider.translations("en_US", {
        TITLE: "How to use",
        HEADER: "You can translate texts by using a filter.",
        SUBHEADER: "And if you don't like filters, you can use a directive.",
        HTML_KEYS: "If you don't like an empty elements, you can write a key for the translation as an inner HTML of the directive.",
        DATA_TO_FILTER: "Your translations might also contain any static ({{staticValue}}) or random ({{randomValue}}) values, which are taken directly from the model.",
        DATA_TO_DIRECTIVE: "And it's no matter if you use filter or directive: static is still {{staticValue}} and random is still {{randomValue}}.",
        RAW_TO_FILTER: "In case you want to pass a {{type}} data to the filter, you have only to pass it as a filter parameter.",
        RAW_TO_DIRECTIVE: "This trick also works for {{type}} with a small mods.",
        SERVICE: "Of course, you can translate your strings directly in the js code by using a $translate service.",
        SERVICE_PARAMS: "And you are still able to pass params to the texts. Static = {{staticValue}}, random = {{randomValue}}."
      });
      $translateProvider.translations("ru_RU", {
        TITLE: "Как пользоваться",
        HEADER: "Вы можете переводить тексты при помощи фильтра.",
        SUBHEADER: "А если Вам не нравятся фильтры, Вы можете воспользоваться директивой.",
        HTML_KEYS: "Если вам не нравятся пустые элементы, Вы можете записать ключ для перевода в как внутренний HTML директивы.",
        DATA_TO_FILTER: "Ваши переводы также могут содержать любые статичные ({{staticValue}}) или случайные ({{randomValue}}) значения, которые берутся прямо из модели.",
        DATA_TO_DIRECTIVE: "И совершенно не важно используете ли Вы фильтр или директиву: статическое значение по прежнему {{staticValue}} и случайное - {{randomValue}}.",
        RAW_TO_FILTER: "Если вы хотите передать \"сырые\" ({{type}}) данные фильтру, Вам всего лишь нужно передать их фильтру в качестве параметров.",
        RAW_TO_DIRECTIVE: "Это также работает и для директив ({{type}}) с небольшими модификациями.",
        SERVICE: "Конечно, Вы можете переводить ваши строки прямо в js коде при помощи сервиса $translate.",
        SERVICE_PARAMS: "И вы все еще можете передавать параметры в тексты. Статическое значение = {{staticValue}}, случайное = {{randomValue}}."
      });
      return $translateProvider.preferredLanguage('en_US');
    }
  ]);

}).call(this);

import eventAdmin from './event-admin/event-admin.component.js';
import '../scss/app.scss';
import eventList from './event-list/event-list.component.js';
import usersApp from './users/users.component.js';


const routerApp = angular.module('app', ['ui.router', 'eventAdmin', 'eventList', 'usersApp', 'angularMoment']).run((amMoment) => {
  amMoment.changeLocale('sv');
});

routerApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
  let
    eventList = {
      name: 'eventList',
      url: '/events',
      component: 'eventList'
    },
    usersState = {
      name: 'users',
      url: '/login',
      component: 'usersApp'
    };

  $stateProvider
    .state(usersState)
    .state(eventList);

  $urlRouterProvider.otherwise('/events');
  $locationProvider.html5Mode(true);

// to avoid csrf error for authenticated requests
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});
import angular from 'angular';
import eventList from './event-list/event-list.component.js';
import '../assets/scss/app.scss';

angular.module('app', [eventList.name]);
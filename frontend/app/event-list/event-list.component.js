import eventListController from './event-list.controller';

export default angular.
  module('eventList', ['angularMoment']).
  component('eventList', {
    template: require('./event-list.template.html'),
    controller: eventListController
  }).
  factory('eventListFactory', ['$http', function ($http) {
    let restEndpoint = '/api/';
    let eventListFactory = {};

    eventListFactory.getList = () => {
      return $http.get(restEndpoint)
    };

    eventListFactory.getSingle = (id) => {
      return $http.get(restEndpoint + id)
    };
    eventListFactory.deleteSingle = (id) => {
      return $http.delete(restEndpoint + id)
    };

    return eventListFactory

}]);

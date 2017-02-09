import usersController from './users.controller';


export default angular.module('usersApp', []).
  config(function ($httpProvider) {
    // to avoid csrf error for authenticated requests
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  }).
  component('usersApp', {
    template: require('./login-template.html'),
    controller: usersController
  }).
  factory('Users', ['$http', function ($http) {
    let endpoint = {
      login: '/api-token-auth/',
      register: '/api/users/register'
    };
    let Users = {};

    Users.login = (user) => {
      return $http.post(endpoint.login, user);
    };
    Users.register = (user) => {
      return $http.post(endpoint.register, user);
    };

    return Users

}]);

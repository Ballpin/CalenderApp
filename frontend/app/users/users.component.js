import usersController from './users.controller';


export default angular.module('usersApp', []).
  component('usersApp', {
    template: require('./login-template.html'),
    controller: usersController
  }).
  factory('Users', ['$http', function ($http) {
    let endpoint = {
      login: '/api/users/login',
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

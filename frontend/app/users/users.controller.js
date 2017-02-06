export default function ($scope, Users, $location, $sce) {

  $scope.user = {};
  $scope.error = {
    text: $sce.trustAsHtml('Something went wrong. <br> Try again!'),
    css: {}
  }
  $scope.loginUser = () => {
    Users.login(JSON.stringify($scope.user))
      .then((success) => {
        $location.path('/events')
      }, (error) => {
        $scope.error.css = {"display": "block"}
        //angular.element(document.querySelector('.error')).html('Something went wrong. <br> Try again!').css('display', 'block');
      });
  }

  // Users.register(JSON.stringify(userRegister)).
  // then((success) => {
  //     console.log(success);
  // }, (error) => {
  //   console.log(error);
  // });
}
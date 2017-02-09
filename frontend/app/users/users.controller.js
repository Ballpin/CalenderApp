export default function ($scope, Users, $location, $sce, $state) {

  $scope.user = {};
  $scope.error = {
    text: $sce.trustAsHtml('Something went wrong. <br> Try again!'),
    css: {}
  };
  $scope.loginUser = () => {
    Users.login(JSON.stringify($scope.user))
      .then((success) => {
        console.log(success.data.token);
        sessionStorage.setItem('token', success.data.token);
        $state.go('eventList');
      }, (error) => {
        $scope.error.css = {"display": "block"};
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
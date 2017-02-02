export default function ($scope, Users) {

  $scope.user = {};

  $scope.loginUser = () => {
    Users.login(JSON.stringify($scope.user))
      .then((success) => {
        window.location.href = '/event'
      }, (error) => {
        angular.element(document.querySelector('.error')).html('Something went wrong. <br> Try again!').css('display', 'block');
      });
  }

  // Users.register(JSON.stringify(userRegister)).
  // then((success) => {
  //     console.log(success);
  // }, (error) => {
  //   console.log(error);
  // });
}
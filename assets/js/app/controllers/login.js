//Vista login.ejs
app.controller('loginController',function($scope){

  $scope.login = function(){
    if ($scope.loginForm.$valid) {
      loginForm.submit();
    }
  };


});

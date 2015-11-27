/**
 * Created by ±¸ÀçÀü on 2015-11-23.
 */
angular.module('campusBankApp').controller('loginController', ['$scope', 'login', function($scope, login){

  $scope.login = function(){
    login.login($scope.email, $scope.password).success(function(data){
      console.log(data);
    });
  };

}]);
/**
 * Created by ±¸ÀçÀü on 2015-11-23.
 */
angular.module('campusBankApp').controller('authController', ['$scope', 'authenticate', function($scope, authenticate){

  $scope.login = function(){
    authenticate.login($scope.email, $scope.password);
  };

}]);
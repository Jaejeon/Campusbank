/**
 * Created by ±¸ÀçÀü on 2015-11-25.
 */
angular.module('campusBankApp').factory('authenticate', ['$http', function($http){

  var service = {};

  service.login = function(email, password){
    $http.post('/auth/login', { email: email, password: password })
      .success(function(data){
        return console.log(data);
      })
      .error(function(err){
        return console.log(err);
      });
  };

  return service;
}]);
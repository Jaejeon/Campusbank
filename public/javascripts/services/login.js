/**
 * Created by ±¸ÀçÀü on 2015-11-25.
 */
angular.module('campusBankApp').factory('login', ['$http', function($http){
  var service = {};

  service.login = function(email, password){
    $http.post('/auth/login', { email: email, password: password })
      .success(function(data){
        return data;
      })
      .error(function(err){
        return err;
      })
  };

  return service;
}]);
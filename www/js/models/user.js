(function(){
  var app = angular.module('fuelergy');
  
  function User($resource, API_URL){
    return $resource(API_URL + '/api/user/:id', { id: '@id' }, {
        login: { method: 'POST', url: API_URL + '/api/login', isArray: false }
    });
  }

  app.factory('User', ['$resource', 'API_URL', User]);
}());

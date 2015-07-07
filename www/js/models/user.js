(function(){
  var app = angular.module('fuelergy');
  
  function User($resource){
    return $resource('http://fuelergy.com/user/:id', { id: '@id' }, {
        login: { method: 'POST', url: 'http://fuelergy.com/login', isArray: false }
    });
  }

  app.factory('User', ['$resource', User]);
}());

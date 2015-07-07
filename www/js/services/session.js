(function(){
  var app = angular.module('fuelergy');

  function Session(){
    return {
      currentUser: null
    }
  }

  app.factory('Session', [Session]);
}());

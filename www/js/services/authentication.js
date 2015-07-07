(function(){  
  var app = angular.module('fuelergy');

  function Authentication(Session){
    return {
      loggedIn: function() {
        return Session.currentUser != null;
      }
    };
  }

  app.factory('Authentication', ['Session', Authentication]);
}());

(function(){
  var app = angular.module('fuelergy');

  function Session($cookieStore){
    function setCurrentUser(user){
      var self = this;

      self.currentUser = user;
      $cookieStore.put('currentUser', user);
    }

    function getCurrentUser(){
      var self = this;
      self.currentUser = $cookieStore.get('currentUser') || null;
    }

    function removeCurrentUser(){
      var self = this;
      self.currentUser = null;
      $cookieStore.remove('currentUser');
    }

    return {
      currentUser:       null,
      getCurrentUser:    getCurrentUser,
      removeCurrentUser: removeCurrentUser,
      setCurrentUser:    setCurrentUser
    }
  }

  var injects = [
    '$cookieStore',
    Session
  ]

  app.factory('Session', injects);
}());

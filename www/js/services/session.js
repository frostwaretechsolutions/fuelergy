(function(){
  var app = angular.module('fuelergy');

  function Session($cookieStore, $rootScope){
    function setCurrentUser(user){
      var self = this;

      self.currentUser = user;
      $rootScope.$broadcast('$userChange');
      $cookieStore.put('currentUser', user);
    }

    function getCurrentUser(){
      var self = this;
      self.currentUser = $cookieStore.get('currentUser') || null;
    }

    function removeCurrentUser(){
      var self = this;
      self.currentUser = null;
      $rootScope.$broadcast('$userChange');
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
    '$rootScope',
    Session
  ]

  app.factory('Session', injects);
}());

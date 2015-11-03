(function(){  
  var app = angular.module('fuelergy');

  function Authentication($q, Session, User){
    return {
      loggedIn: function() {
        return Session.currentUser != null;
      },

      login: function(loginData){
        var def = $q.defer();

        if(!(loginData.username && loginData.password)){
          def.reject({type: 'warning', msg: 'Your username or password was incorrect' });
        } else {
          User.login(loginData, function(user){
            def.resolve(user);
          }, function(response){
            var message = 'There was an error in your request. Please try again. We apologize.';
            if(response.status == '404') message = 'Your username or password was incorrect';

            def.reject({ type: 'warning', msg: message });
          });
        }

        return def.promise;
      }
    };
  }

  var injects = [
    '$q',
    'Session',
    'User',
    Authentication
  ];

  app.factory('Authentication', injects);
}());

(function(){
  var app = angular.module('fuelergy');

  function ProfileCtrl($scope, $ionicPopup, Session, STATES, Edmund, User){
    // Definition
    function init(){
      var currentYear = new Date().getFullYear();
      $scope.user     = Session.currentUser;
      $scope.states   = STATES;
      $scope.years    = [];
      $scope.makes    = [];
      $scope.models   = [];

      for(var i=currentYear;i>=1950;i--){
        $scope.years.push(i);
      }
    }

    function getMakes(){
      Edmund.makes({
        year: $scope.user.year
      }, function(data){
        $scope.makes = data.makes;
      }, function(err){
      });
    }

    function getModels(){
      Edmund.models($scope.user.make,{
        year: $scope.user.year
      }, function(data){
        $scope.models = data.models;
      }, function(err){
      });
    }

    function update(){
      User.update($scope.user.id, $scope.user, function(user){
         $scope.user = user;
         Session.setCurrentUser(user);
         $ionicPopup.alert({ title: 'Success!', template: 'Your profile has successfully saved.' });
      }, function(err){
        
      });
    }

    // Injection
    $scope.init      = init;
    $scope.getMakes  = getMakes;
    $scope.getModels = getModels;
    $scope.update    = update;

    //Initialization
    $scope.init();
  }

  var injects = [
    '$scope',
    '$ionicPopup',
    'Session',
    'STATES',
    'Edmund',
    'User',
    ProfileCtrl
  ];

  app.controller('ProfileCtrl', injects);
}());

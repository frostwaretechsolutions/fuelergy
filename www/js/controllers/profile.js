(function(){
  var app = angular.module('fuelergy');

  function ProfileCtrl($scope, Session, STATES, Edmund){
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

    // Injection
    $scope.init      = init;
    $scope.getMakes  = getMakes;
    $scope.getModels = getModels;

    //Initialization
    $scope.init();
  }

  var injects = [
    '$scope',
    'Session',
    'STATES',
    'Edmund',
    ProfileCtrl
  ];

  app.controller('ProfileCtrl', injects);
}());

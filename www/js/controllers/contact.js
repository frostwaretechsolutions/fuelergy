(function(){
  'use strict';

  var app = angular.module('fuelergy');

  function ContactCtrl($scope, $http, $ionicPopup, $state, Session, Authentication, API_URL){
    function init(){
      $scope.contact = {};
      $scope.contact.email = Session.currentUser ? Session.currentUser.email : null;
      console.log(Session);
    }

    function submitContact(){
      $http.post(API_URL + '/api/contact', $scope.contact).then(function success(data){
        $scope.contact = {};
        var alertPopup = $ionicPopup.alert({
          title: 'Contact Successful',
          template: "You've reached contact. We'll send signal back to you shortly, over."
        });

        alertPopup.then(function(){
          $state.go('app.about');
        });

      }, function error(data){
        $scope.contact = {}; 

        var alertPopup = $ionicPopup.alert({
          title: 'Contact Failure',
          template: "You've failed to reach contact. We apologize for this inconvenience."
        });

        alertPopup.then(function(){
          $state.go('app.about');
        });
      });
    }

    function userChange(){
      $scope.contact.email = Session.currentUser ? Session.currentUser.email : null;
    }

    $scope.init          = init;
    $scope.submitContact = submitContact;

    //Events
    $scope.$on('$userChange', userChange);

    $scope.init();
  }

  var injects = [
    '$scope',
    '$http',
    '$ionicPopup',
    '$state',
    'Session',
    'Authentication',
    'API_URL',
    ContactCtrl
  ];

  app.controller('ContactCtrl', injects);
}());

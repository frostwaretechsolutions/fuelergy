(function(){
  'use strict';

  var app = angular.module('fuelergy');

  function NewsletterCtrl($scope, $http, Session, API_URL){
    function init(){
      $scope.alerts =[];
      $scope.register = {};

      $scope.register.email = Session.currentUser ? Session.currentUser.email : null;
    }

    function subscribe(){
      $scope.alerts = [];

      if($scope.register.email){
        $http.post(API_URL + '/subscribe', $scope.register).then(function(){
          $scope.register = {};
          $scope.alerts.push({ type: 'success', msg: 'You have subscribed!' });
        }, function(){
          $scope.register = {};
          $scope.alerts.push({ type: 'warning', msg: 'We apologize. There was an error.' });
        });
      } else {
        $scope.alerts.push({ type: 'warning', msg: 'Username must be present' });
      }
    }

    $scope.init = init;
    $scope.subscribe = subscribe;

    $scope.init();
  }

  var injects = [
    '$scope',
    '$http',
    'Session',
    'API_URL',
    NewsletterCtrl
  ];

  app.controller('NewsletterCtrl', injects);
}());

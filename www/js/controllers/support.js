(function(){
  'use strict';

  var app = angular.module('fuelergy');

  function SupportCtrl($scope, API_URL){
    function init(){
    }

    $scope.init     = init;

    $scope.init();
  }

  var injects = [
    '$scope',
    'API_URL',
    SupportCtrl
  ];

  app.controller('SupportCtrl', injects);
}());

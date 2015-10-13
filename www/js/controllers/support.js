(function(){
  'use strict';

  var app = angular.module('fuelergy');

  function SupportCtrl($scope){
    function init(){

    }

    $scope.init = init;

    $scope.init();
  }

  var injects = [
    '$scope',
    SupportCtrl
  ];

  app.controller('SupportCtrl', injects);
}());

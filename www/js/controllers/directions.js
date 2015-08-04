(function(){
  'use strict';

  var app = angular.module('fuelergy');

  function DirectionCtrl($scope){
    function init(){
    }

    $scope.init = init;
  }

  var injects = [
    '$scope',
    DirectionCtrl
  ];

  app.controller('DirectionCtrl', injects);
}());

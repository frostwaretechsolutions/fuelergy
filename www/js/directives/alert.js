(function(){
  'use strict';
  var app = angular.module('fuelergy');

  function Alert(){
    return {
      restrict: 'EA',
      controller: 'AlertController',
      templateUrl: 'templates/directives/alert.html',
      transclude: true,
      replace: true,
      scope: {
        type: '@',
        close: '&'
      }
    };
  }

  app.directive('alert', Alert);
}());

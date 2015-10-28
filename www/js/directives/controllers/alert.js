(function(){
  'use strict';

  var app = angular.module('fuelergy');

  function AlertCtrl($scope, $attrs){
    $scope.closeable = 'close' in $attrs;
    this.close = $scope.close;
  }

  var injects = [
    '$scope',
    '$attrs',
    AlertCtrl
  ];

  app.controller('AlertController', injects);

}());

(function(){
  'use strict';

  var app = angular.module('fuelergy');

  function SupportCtrl($scope, $sce, API_URL){
    function init(){
      $scope.movies = {
        findStations: {
          src: API_URL + '/videos/how_to_find.mp4',
          title: 'Finding Gas Stations with Fuelergy'
        }
      };
    }

    function trustSrc(src){
      return $sce.trustAsResourceUrl(src);
    }

    $scope.init     = init;
    $scope.trustSrc = trustSrc;

    $scope.init();
  }

  var injects = [
    '$scope',
    '$sce',
    'API_URL',
    SupportCtrl
  ];

  app.controller('SupportCtrl', injects);
}());

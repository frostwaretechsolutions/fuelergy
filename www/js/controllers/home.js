(function(){
  var app = angular.module('fuelergy');

  function HomeCtrl($scope, MyGasFeed, $cordovaGeolocation, $ionicModal, $ionicLoading, lodash, API_URL){
    function init(cb){
      // Position Options
      var posOptions = {
        timeout: 10000,
        enableHighAccuracy: true
      };

      // Getting Current Position
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position){
        // Getting My Gas Feed Stations
        var opts = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        MyGasFeed.getStations(opts, function(data){
          // Setting Gas Stations, Current Location
          $scope.stations = data.stations;
          $scope.location = data.geoLocation;
          if(cb) cb();
        }, function(data){
          // My Gas Feed Error
        });   
      }, function(err){
        // Location Error
      });
    }

    function refresh(){
      $scope.init(function(){
        $scope.$broadcast('scroll.refreshComplete');
      });
    }

    function loading(){
      $ionicLoading.show({
        content: '<ion-spinner></ion-spinner>'
      });
    }

    function unloading(){
      $ionicLoading.hide();
    }

    function getImage(station){
      return API_URL + '/images/stations/' + station.toLowerCase() + '.png';
    }

    function edit(station){
      $ionicModal.fromTemplateUrl('templates/edit.html', {
        scope: $scope
      }).then(function(modal){
        $scope.editStation = station;
        $scope.editType    = 'reg';
        $scope.editPrice   = parseFloat($scope.editStation.reg_price || 0.00) ;
        $scope.editModal   = modal;
        $scope.editModal.show();
      });
    }

    function close(){
      $scope.editModal.remove().then(function(){
        delete $scope.editType;
        delete $scope.editPrice;
        delete $scope.editStation;
      });
    }

    function setPrice(type){
      $scope.editType  = type;
      $scope.editPrice = $scope.editStation[type + '_price'];
    }

    function upPrice() {
      var price = ($scope.editPrice == 'N/A' || !$scope.editPrice) ? 2.50 : $scope.editPrice;
      $scope.editPrice = (parseFloat(price) + 0.01).toFixed(2);
    }

    function downPrice() {
      var price = ($scope.editPrice == 'N/A' || !$scope.editPrice) ? 2.50 : $scope.editPrice;
      $scope.editPrice = (parseFloat(price)- 0.01).toFixed(2);
    }

    function updatePrice() {
      MyGasFeed.updateStation({
        price: $scope.editPrice,
        fueltype: $scope.editType,
        stationid: $scope.editStation.id
      }, function(data){
        var index = lodash.findIndex($scope.stations, function(station){
          return station.id == $scope.editStation.id;
        });
        $scope.stations[index][$scope.editType + '_price'] = $scope.editPrice;
        $scope.close(); 
      }, function(err){

      });
    }

    $scope.init        = init;
    $scope.loading     = loading;
    $scope.unloading   = unloading;
    $scope.refresh     = refresh;
    $scope.getImage    = getImage;
    $scope.edit        = edit;
    $scope.close       = close;
    $scope.setPrice    = setPrice;
    $scope.upPrice     = upPrice;
    $scope.downPrice   = downPrice;
    $scope.updatePrice = updatePrice;

    //Initial Properties
    $scope.types = ['reg', 'mid', 'pre', 'diesel'];

    $scope.loading();
    $scope.init($scope.unloading);
  }

  app.controller('HomeCtrl', ['$scope', 'MyGasFeed', '$cordovaGeolocation', '$ionicModal', '$ionicLoading', 'lodash', 'API_URL', HomeCtrl]);

}());

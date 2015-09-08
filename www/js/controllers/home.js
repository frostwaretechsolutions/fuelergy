(function(){
  var app = angular.module('fuelergy');

  function HomeCtrl($scope, $window, MyGasFeed, $cordovaGeolocation, $ionicModal, $ionicLoading, $cordovaGoogleAds, $cordovaDevice, lodash, API_URL, ADMOB, GOOGLE_KEY){
    function init(){
      $scope.loading();
      // Position Options
      $scope.loadAd();

      var posOptions = {
        timeout: 10000,
        enableHighAccuracy: true
      };

      $scope.sortOption = 'distance';

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
          $scope.unloading();
        }, function(data){
          // My Gas Feed Error
        });   
      }, function(err){
        // Location Error
      });
    }

    function refresh(){
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
          $scope.$broadcast('scroll.refreshComplete');
        }, function(data){
          // My Gas Feed Error
        });   
      }, function(err){
        // Location Error
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

    function loadAd(){
      $scope.platform = 'www';
      document.addEventListener('deviceready', function(){
        $scope.platform = $cordovaDevice.getPlatform();
        var admobid = ADMOB[$scope.platform.toLowerCase()]; 
        $cordovaGoogleAds.createBanner({
          adId: admobid.banner,
          position: 8,
          overlay: true,
          isTesting: false,
          autoShow: true // auto show interstitial ad when loaded
        }).then(function(){}, function(){});
      }, false);
    }

    function openDirections(station){
      var destination = station.address ? [station.address, station.city, station.region].join(', ').replace(' ', '+') : [station.lat, station.lng].join(',');
      var url = 'comgooglemaps-x-callback://?&daddr=' + destination + '&directionsmode=driving&x-success=fuelergy://?resume=true&x-source=Fuelergy';
      if($scope.platform === 'www') url = 'https://maps.google.com?&daddr=' + destination; 
      $window.location = url;
    }

    function closeDirections(){
      $scope.directionModal.remove();
    }

    function toggleSort(){
      $scope.sortToggle = !$scope.sortToggle;
    }

    $scope.init            = init;
    $scope.loading         = loading;
    $scope.unloading       = unloading;
    $scope.refresh         = refresh;
    $scope.getImage        = getImage;
    $scope.edit            = edit;
    $scope.close           = close;
    $scope.setPrice        = setPrice;
    $scope.upPrice         = upPrice;
    $scope.downPrice       = downPrice;
    $scope.updatePrice     = updatePrice;
    $scope.loadAd          = loadAd;
    $scope.openDirections  = openDirections;
    $scope.closeDirections = closeDirections;
    $scope.toggleSort      = toggleSort;


    //Initial Properties
    $scope.types = ['reg', 'mid', 'pre', 'diesel'];

    $scope.init();
    $scope.loadAd();
  }

  // Injection
  var injects = [
    '$scope',
    '$window',
    'MyGasFeed',
    '$cordovaGeolocation',
    '$ionicModal',
    '$ionicLoading',
    '$cordovaGoogleAds',
    '$cordovaDevice',
    'lodash',
    'API_URL',
    'ADMOB',
    'GOOGLE_KEY',
    HomeCtrl
  ];
  app.controller('HomeCtrl', injects);

}());

(function(){
  var app = angular.module('fuelergy');

  function MyGasFeed($http, API_URL, API_KEY){
    var api = API_URL + '/api';

    function getStations(opts, success, error){
      var url = [api,
                 'stations',
                 opts.lat,
                 opts.lng,
                 opts.dist || '2',
                 opts.fuel || 'reg',
                 opts.sort || 'distance',
                 API_KEY].join('/');

      $http.get(url).success(success).error(error);
    }

    function updateStation(opts, success, error) {
      var url = [api, 'update', API_KEY].join('/');
      $http.post(url, opts).success(success).error(error);
    }

    return {
      getStations:   getStations,
      updateStation: updateStation
    };
  }

  app.factory('MyGasFeed', ['$http', 'API_URL', 'API_KEY', MyGasFeed]);
}());

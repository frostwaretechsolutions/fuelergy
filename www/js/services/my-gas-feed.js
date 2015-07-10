(function(){
  var app = angular.module('fuelergy');

  function MyGasFeed($http, API_URL){
    var api = API_URL + '/api';
    var apiKey = 'xsll7eurs7';

    function getStations(opts, success, error){
      var url = [api,
                 'stations',
                 opts.lat,
                 opts.lng,
                 opts.dist || '2',
                 opts.fuel || 'reg',
                 opts.sort || 'distance',
                 apiKey].join('/');

      $http.get(url).success(success).error(error);
    }

    function updateStation(opts, success, error) {
      var url = [api, 'update', apiKey].join('/');
      $http.post(url, opts).success(success).error(error);
    }

    return {
      getStations:   getStations,
      updateStation: updateStation
    };
  }

  app.factory('MyGasFeed', ['$http', 'API_URL', MyGasFeed]);
}());

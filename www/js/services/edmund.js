(function(){
  var app = angular.module('fuelergy');

  function Edmund($http, EDMUND_URL, EDMUND_KEY, EDMUND_SECRET){
    function models(make, opts, success, error){
      var self = this;

      var url = [
        EDMUND_URL,
        make,
        'models'
      ].join('/');
      
      url += '?' + self.formParams(opts) + self.sign();

      $http.get(url).success(success).error(error);
    }

    function makes(opts, success, error){
      var self = this;

      var url = [
        EDMUND_URL,
        'makes'
      ].join('/');

      url += '?' + self.formParams(opts) + self.sign();

      $http.get(url).success(success).error(error);
    }

    function formParams(opts){
      var params = Object.keys(opts).map(function(key){
        return key + '=' + opts[key];
      }).join('&');
    }

    function sign(){
      var params = '&' + [
        'fmt-json',
        'api_key=' + EDMUND_KEY
      ].join('&');

      return params;
    }

    return {
      makes:      makes,
      models:     models,
      formParams: formParams,
      sign:       sign
    };
  }

  var injects = [
    '$http',
    'EDMUND_URL',
    'EDMUND_KEY',
    'EDMUND_SECRET',
    Edmund
  ];
  app.factory('Edmund', injects);
}());

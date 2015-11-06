(function(){
  var app = angular.module('fuelergy');
  
  function Activity($resource, API_URL){
    return $resource(API_URL + '/api/activity/:id', { id: '@id' }, {
    });
  }

  app.factory('Activity', ['$resource', 'API_URL', Activity]);
}());

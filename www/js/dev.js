(function(){
  var app = angular.module('dev', ['fuelergy', 'ngMockE2E']);

  var profile = {
    username: 'frostme',
    passowrd: 'snowman7'
  }
  function loginResponse(method, url, data){
    return [200, profile, {}];
  }
  function run($httpBackend){
    $httpBackend.whenPOST('http://fuelergy.com/login').respond(loginResponse);
    $httpBackend.whenGET(/.*templates*./).passThrough();
    $httpBackend.whenGET(/.*localhost*./).passThrough();
    $httpBackend.whenPOST(/.*localhost*./).passThrough();
    $httpBackend.whenGET(/.*fuelergy*./).passThrough();
    $httpBackend.whenPOST(/.*fuelergy*./).passThrough();
  }

  app.run(run);
}());

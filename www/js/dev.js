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
    $httpBackend.whenGET(/.*templates.*/i).passThrough();
    $httpBackend.whenGET(/.*localhost.*/i).passThrough();
    $httpBackend.whenPOST(/.*localhost.*/i).passThrough();
    $httpBackend.whenGET(/.*fuelergy.*/i).passThrough();
    $httpBackend.whenPOST(/.*fuelergy.*/i).passThrough();
  }

  app.run(run);
}());

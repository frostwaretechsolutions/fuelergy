(function(){
  var app = angular.module('dev', ['fuelergy', 'ngMockE2E']);

  var profile = {
    username: 'frostme',
    passowrd: 'snowman7',
    firstName: 'Michael',
    lastName:  'Frost',
    id: 1
  }
  function loginResponse(method, url, data){
    return [200, profile, {}];
  }
  function run($httpBackend){
    $httpBackend.whenGET(/.*templates.*/i).passThrough();
    $httpBackend.whenGET(/.*localhost.*/i).passThrough();
    $httpBackend.whenPOST(/.*localhost.*/i).passThrough();
    $httpBackend.whenPUT(/.*localhost.*/i).passThrough();
    $httpBackend.whenGET(/.*fuelergy.*/i).passThrough();
    $httpBackend.whenPOST(/.*fuelergy.*/i).passThrough();
    $httpBackend.whenPUT(/.*fuelergy.*/i).passThrough();
    $httpBackend.whenGET(/.*edmunds.*/i).passThrough();
    $httpBackend.whenPOST(/.*edmunds.*/i).passThrough();
  }

  app.run(run);
}());

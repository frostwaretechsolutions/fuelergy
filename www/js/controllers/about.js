(function(){
  var app = angular.module('fuelergy');

  function AboutCtrl($scope, $window, $state, $cordovaAppAvailability, $cordovaDevice, $cordovaInAppBrowser){
    // Definition
    function init(){
      $scope.availability = {};
      $scope.loadAvailability();
      $scope.links = [
        {
          name: 'Support',
          state: 'support'
        }, {
          name: 'Privacy',
          state: 'privacy'
        }, {
          name: 'Security',
          state: 'security'
        }, {
          name: 'Terms of Service',
          state: 'terms'
        }, {
          name: 'Policies',
          state: 'policies'
        }, {
          name: 'Newsletter',
          state: 'newsletter'
        }, {
          name: 'Blog',
          link: '//fuelergy.weebly.com'
        }, {
          name: 'Contact Us',
          state: 'contact'
        }, {
          name: '@fuelergy',
          link: '//twitter.com/fuelergy',
          twitter: 'fuelergy'
        }, {
          name: '@TeamFrostware',
          link: '//twitter.com/teamfrostware',
          twitter: 'teamfrostware'
        }
      ];
    }

    function linkClick(link){
       var options = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'yes'
      };
      if(link.twitter) {
        if($scope.availability.twitter){
          $window.open('twitter://user?screen_name=' + link.twitter);
        } else {
          if($scope.availability.googlechrome){
            $window.open('googlechromes:' + link.link);
          } else {
            $cordovaInAppBrowser.open('https:' + link.link, '_blank', options).then(function(ev){} , function(ev){});
          }
        }
      } else if (link.state){
        $state.go('app.' + link.state);
      } else {
        if($scope.availability.googlechrome){
          $window.open('googlechromes:' + link.link)
        } else {
          $cordovaInAppBrowser.open('https:' + link.link, '_blank', options).then(function(ev){} , function(ev){});
        }
      }
    }

    function loadAvailability(){
      document.addEventListener('deviceready', function(){
        $scope.platform = $cordovaDevice.getPlatform();
        ['twitter','googlechrome'].forEach(function(item){
          $cordovaAppAvailability.check(item + '://').then(function(){
            $scope.availability[item] = true;
          }, function(){
            $scope.availability[item] = false;
          });
        });
      }, false);

    }

    // Injection
    $scope.init             = init;
    $scope.linkClick        = linkClick;
    $scope.loadAvailability = loadAvailability;

    //Initialization
    $scope.init();
  }

  var injects = [
    '$scope',
    '$window',
    '$state',
    '$cordovaAppAvailability',
    '$cordovaDevice',
    '$cordovaInAppBrowser',
    AboutCtrl
  ];

  app.controller('AboutCtrl', injects);
}());

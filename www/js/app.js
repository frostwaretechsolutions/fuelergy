(function(){
  var injects = [
    'ionic',
    'ngResource',
    'ngCordova',
    'ngLodash',
    'ngCookies',
    'ui.utils.masks'
  ];

  angular.module('fuelergy', injects)

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider, $httpProvider, $cordovaInAppBrowserProvider) {
    $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent': {
          templateUrl: "templates/home.html",
          controller: 'HomeCtrl'
        }
      }
    })

    .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html',
          controller: 'AboutCtrl'
        }
      }
    })

    .state('app.support', {
      url: '/support',
      views: {
        'menuContent': {
          templateUrl: 'templates/about/support.html',
          controller:  'SupportCtrl'
        }
      }
    })

    .state('app.privacy', {
      url: '/privacy',
      views: {
        'menuContent': {
          templateUrl: 'templates/about/privacy.html',
        }
      }
    })

    .state('app.security', {
      url: '/security',
      views: {
        'menuContent': {
          templateUrl: 'templates/about/security.html',
        }
      }
    })

    .state('app.terms', {
      url: '/terms',
      views: {
        'menuContent': {
          templateUrl: 'templates/about/terms.html',
        }
      }
    })

    .state('app.policies', {
      url: '/policies',
      views: {
        'menuContent': {
          templateUrl: 'templates/about/policies.html',
        }
      }
    })

    .state('app.newsletter', {
      url: '/newsletter',
      views: {
        'menuContent': {
          templateUrl: 'templates/about/newsletter.html',
          controller: 'NewsletterCtrl'
        }
      }
    })

    .state('app.contact', {
      url: '/contact',
      views: {
        'menuContent': {
          templateUrl: 'templates/about/contact.html',
          controller:  'ContactCtrl'
        }
      }
    })
    
    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');

    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    var defaultOptions = {
      location: 'no',
      clearcache: 'no',
      toolbar: 'no'
    };

    $cordovaInAppBrowserProvider.setDefaultOptions(defaultOptions);
  });
}());

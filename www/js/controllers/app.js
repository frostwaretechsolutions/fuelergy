(function(){
  var app = angular.module('fuelergy');

  function AppCtrl($scope, $ionicModal, $ionicPopup, $timeout, $state, Session, Authentication, User) {
    
    $scope.loginData = {};

    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.loginModal = modal;
    });

    function init(){
      Session.getCurrentUser();
    }

    function closeLogin() {
      $scope.loginModal.hide();
      $scope.loginData = {};
    }

    function login() {
      $scope.loginModal.show();
    }

    function logout() {
      var logoutPopup = $ionicPopup.confirm({
        title: 'Logout',
        template: 'Are you sure you wish to logout?'
      });

      logoutPopup.then(function(res){
        if(res) {
          $scope.doLogout();
        }
      });
    }

    function doLogout() {
      Session.removeCurrentUser();
      $state.go('app.home');
    }

    function doLogin(){
      User.login($scope.loginData, function(user){
        Session.setCurrentUser(user);
        $scope.closeLogin();
      }, function(){

      });
    }


    $scope.closeLogin  = closeLogin;
    $scope.login       = login;
    $scope.logout      = logout;
    $scope.doLogin     = doLogin;
    $scope.doLogout    = doLogout;
    $scope.loggedIn    = Authentication.loggedIn;
    $scope.init        = init;

    $scope.init();

  }

  var injects = [
    '$scope',
    '$ionicModal',
    '$ionicPopup',
    '$timeout',
    '$state',
    'Session',
    'Authentication',
    'User',
    AppCtrl
  ];

  app.controller('AppCtrl', injects);
}());

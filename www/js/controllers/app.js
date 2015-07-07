(function(){
  var app = angular.module('fuelergy');

  function AppCtrl($scope, $ionicModal, $ionicPopup, $timeout, Session, Authentication, User) {
    
    $scope.loginData = {};

    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.loginModal = modal;
    });

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
      Session.currentUser = null;
    }

    function doLogin(){
      User.login($scope.loginData, function(user){
        Session.currentUser = user;
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

  }

  app.controller('AppCtrl', ['$scope', '$ionicModal', '$ionicPopup', '$timeout', 'Session', 'Authentication', 'User', AppCtrl]);
}());

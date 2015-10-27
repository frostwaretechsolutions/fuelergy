(function(){
  var app = angular.module('fuelergy');

  function AppCtrl($scope, $ionicModal, $ionicPopup, $timeout, $state, Session, Authentication, User) {
    
    $scope.loginData = {};
    $scope.signupData = {};
    $scope.loginAlerts = [];
    $scope.signupAlerts = [];

    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.loginModal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/signup.html', {
      scope: $scope
    }).then(function(modal){
      $scope.signupModal = modal;
    });

    function init(){
      Session.getCurrentUser();
    }

    function closeLogin() {
      $scope.loginModal.hide();
      $scope.loginData = {};
    }
    
    function closeSignup() {
      $scope.signupModal.hide();
      $scope.signupData = {};
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

    function signup(){
      $scope.signupModal.show();
    }

    function doLogout() {
      Session.removeCurrentUser();
      $state.go('app.home');
    }

    function doLogin(){
      $scope.loginAlerts = [];
      User.login($scope.loginData, function(user){
        Session.setCurrentUser(user);
        $scope.closeLogin();
      }, function(response){
        var message = 'There was an error in your request. Please try again. We apologize.';
        if(response.status == '404'){
          message = 'Your username or password was incorrect';
        }

        $scope.loginData.password = '';

        $scope.loginAlerts.push({ type: 'warning', msg: message });
      });
    }

    function doSignup() {
      $scope.signupAlerts = [];
      User.save($scope.signupData, function(user){
        Session.setCurrentUser(user);
        $scope.closeSignup();
      }, function(response){
        var message = 'There was an error in your request. Please try again. We apologize.';

        if(response.status == '409'){
          message = 'A user with that email or username already exists.';
        }

        $scope.signupData = {};

        $scope.signupAlerts.push({ type: 'warning', msg: message });
      });
    }

    function closeLoginAlert(index){
      $scope.loginAlerts.splice(index, 1);
    }

    function closeSignupAlert(index){
      $scope.signupAlerts.splice(index, 1);
    }


    $scope.closeLogin       = closeLogin;
    $scope.closeSignup      = closeSignup;
    $scope.closeLoginAlert  = closeLoginAlert
    $scope.closeSignupAlert = closeSignupAlert
    $scope.login            = login;
    $scope.logout           = logout;
    $scope.signup           = signup;
    $scope.doLogin          = doLogin;
    $scope.doLogout         = doLogout;
    $scope.doSignup         = doSignup;
    $scope.loggedIn         = Authentication.loggedIn;
    $scope.init             = init;

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

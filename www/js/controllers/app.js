(function(){
  var app = angular.module('fuelergy');

  function AppCtrl($scope, $ionicModal, $ionicPopup, $timeout, $state, $rootScope, Session, Authentication, User) {
    
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
      $rootScope.$broadcast('$userChange');
      $state.go('app.home');
    }

    function doLogin(){
      $scope.loginAlerts = [];

      Authentication.login($scope.loginData).then(function(user){
        Session.setCurrentUser(user);
        $scope.closeLogin();
        $rootScope.$broadcast('$userChange');
      }, function(err){
        $scope.loginAlerts.push(err);
        $scope.loginData.password = null;
      });
    }

    function doSignup() {
      $scope.signupAlerts = [];
      if(!$scope.signupData.username){
        $scope.signupAlerts.push({ type: 'warning', msg: 'Username must be present' });
      } else if(!($scope.signupData.email && /[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*/.test($scope.signupData.email))) {
        $scope.signupAlerts.push({ type: 'warning', msg: 'Must be valid email.' });
      } else if (!$scope.signupData.password){
        $scope.signupAlerts.push({ type: 'warning', msg: 'Password must be present.' });
      } else if (!$scope.signupData.password.length > 7) {
        $scope.signupAlerts.push({ type: 'warning', msg: 'Password must be 7 characters long.' });
      } else if($scope.signupData.password != $scope.signupData.confirm) {
        $scope.signupAlerts.push({ type: 'warning', msg: 'Passwords must match.' });
      } else {
        User.save($scope.signupData, function(user){
          Session.setCurrentUser(user);
          $scope.closeSignup();
          $rootscope.$broadcast('$userChange');
        }, function(response){
          var message = 'There was an error in your request. Please try again. We apologize.';

          if(response.status == '409'){
            message = 'A user with that email or username already exists.';
          }

          $scope.signupData = {};

          $scope.signupAlerts.push({ type: 'warning', msg: message });
        });
      }
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
    '$rootScope',
    'Session',
    'Authentication',
    'User',
    AppCtrl
  ];

  app.controller('AppCtrl', injects);
}());

// Code your heart out

// IIFE ("iffy") - immediately invoked function expression
// --> No global variables.
(function(){
  var app = angular.module("githubViewer");
  
  var MainController = function($scope, github, $interval, $log, $anchorScroll, $location){
    $scope.message = "Enter username";
    $scope.title = "GibHub Viewer";
    $scope.repoSortOrder = "-stargazers_count";
    $scope.repoLimit = "none"
    $scope.countdown = 5;
    
    var onUserComplete = function(data){
      $scope.message = "Found User";
      $scope.user = data;
      github.getRepos($scope.user).then(onRepos, onError);
    };
    
    var onRepos = function(data){
      $scope.repos = data;
      $location.hash("userDetails");
      $anchorScroll();
    }
    
    var onError = function(reason){
      $scope.error = reason;
      $scope.message = "Could not fetch the data";
    };
    
    var decrementCountdown = function() {
      $scope.countdown -= 1;
      if($scope.countdown < 1) {
        $scope.search($scope.username);
        $scope.countdown = "";
      }      
    };
    
    var countdownInterval = null;
    var startCountdown = function() {
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    }
  
    $scope.search = function(username){
      $log.info("Searching for " + username);
      $scope.message = "Searching...";
      github.getUser(username).then(onUserComplete, onError);
      
      if(countdownInterval){
        $interval.cancel(countdownInterval);
        $scope.countdown = "";
      }
    };
    
    $scope.templates = 
      [{ name: 'userdetails', url: 'userdetails.html' }]
    
    $scope.template = $scope.templates[0]
    
    startCountdown();
  };
  
  app.controller("MainController", ["$scope", "github", "$interval", "$log", "$anchorScroll", "$location", MainController]);
    
}());
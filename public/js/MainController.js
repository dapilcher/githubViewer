// Code your heart out

// IIFE ("iffy") - immediately invoked function expression
// --> No global variables.
(function(){
  var app = angular.module("githubViewer");
  
  var MainController = function($scope, $interval, $location){
    $scope.username = "angular";
    $scope.message = "Enter username";
    $scope.repoSortOrder = "-stargazers_count";
    $scope.repoLimit = "none"
    $scope.countdown = 5;
    
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
      $scope.message = "Searching...";      
      if(countdownInterval){
        $interval.cancel(countdownInterval);
        $scope.countdown = "";
      }
      // routing logic
    };
    
    $scope.templates = 
      [{ name: 'userdetails', url: 'userdetails.html' }]
    
    $scope.template = $scope.templates[0]
    
    startCountdown();
  };
  
  app.controller("MainController", ["$scope", "$interval", "$location", MainController]);
    
}());
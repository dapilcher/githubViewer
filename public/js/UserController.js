// Code your heart out

// IIFE ("iffy") - immediately invoked function expression
// --> No global variables.
(function(){
  var module = angular.module("githubViewer");
  
  var UserController = function($scope, github, $routeParams){
    $scope.message = "Searching...";
    $scope.repoSortOrder = "-stargazers_count";
    $scope.repoLimit = "none";
    $scope.username = $routeParams.username;
    
    var onUserComplete = function(data){
      $scope.message = "Found User";
      $scope.user = data;
      github.getRepos($scope.user).then(onRepos, onError);
    };
    
    var onRepos = function(data){
      $scope.repos = data;
    }
    
    var onError = function(reason){
      $scope.error = reason;
      $scope.message = "Could not fetch the data";
    };
    
    github.getUser($scope.username).then(onUserComplete, onError);
  };
  
  module.controller("UserController", ["$scope", "github", "$routeParams", UserController]);
    
}());
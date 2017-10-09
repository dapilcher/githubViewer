// Code your heart out

// IIFE ("iffy") - immediately invoked function expression
// --> No global variables.
(function(){
  var module = angular.module("githubViewer");
  
  var RepoController = function($scope, github, $routeParams){
    $scope.message = "Searching...";
    $scope.repoSortOrder = "-stargazers_count";
    $scope.repoLimit = "none";
    $scope.username = $routeParams.username;
    $scope.reponame = $routeParams.reponame;
    
    var onRepo = function(data){
      $scope.message = "Found repo data";
      $scope.repo = data;
    }
    
    var onError = function(reason){
      $scope.error = reason;
      $scope.message = "Could not fetch the data";
    };
    
    github.getRepoDetails($scope.username, $scope.reponame).then(onRepo, onError);
  };
  
  module.controller("RepoController", ["$scope", "github", "$routeParams", RepoController]);
    
}());
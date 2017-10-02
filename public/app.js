(function(){
  var app = angular.module("githubViewer", ["ngRoute"]);
  
  var app.config(function($routeProvider){
    $routeProvider
      .when("/main", {
        templateUrl: "views/main.html",
        controller: "MainController"
      })
      .otherwise({redirectTo:"/main"});
  });
  
}());
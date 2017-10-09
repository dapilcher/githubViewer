(function(){
  
  var github = function($http){
    
    var baseUrl = "https://api.github.com/";
    
    var getUser = function(username) {
      return $http.get(baseUrl + "users/" + username)
        .then(function(response){
          return response.data;
        });
    }
    
    var getRepos = function(user){
      return $http.get(user.repos_url)
        .then(function(response){
          return response.data;
        });
    }
    
    var getRepoDetails = function(username, reponame) {
      var repo;
      var repoUrl = baseUrl + "repos/" + username + "/" + reponame;
      return $http.get(repoUrl)
        .then(function(response){
          repo = response.data;
          return $http.get(repoUrl + "/collaborators");
        })
        .then(function(response){
          repo.collaborators = response.data;
          return repo;
        });
    }
    
    return {
      getUser: getUser,
      getRepos: getRepos,
      getRepoDetails: getRepoDetails
    };
    
  };
  
  var module = angular.module("githubViewer");
  module.factory("github", github);
  
}());
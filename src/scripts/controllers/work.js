angular.module('orggue')
.controller('workCtrl',function($scope,middleware){
  $scope.repos = middleware.getReposBackup();

  $scope.$on('StartGithub',function(){
    $scope.repos = [];
  });

  //var getRepos = function(){
    //middleware.setFilter('url','github/repos');
    //middleware.github();
  //};

  //getRepos();

  $scope.$on('EndGithub',function(err,data){
    angular.forEach(data.repos,function(repo){
      if(!data.cancel) $scope.repos.push(repo);
    });
  });
});

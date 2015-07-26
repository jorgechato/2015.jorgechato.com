angular.module('orggue')
.controller('workCtrl',function($scope,middleware){
  $scope.repos = middleware.getReposBackup();

  $scope.$on('StartGithub',function(){
    $scope.repos = [];
  });

  $scope.$on('EndGithub',function(err,data){
    angular.forEach(data.repos,function(repo){
      if(!data.cancel) $scope.repos.push(repo);
    });
  });
});

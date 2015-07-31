angular.module('orggue')
.controller('workCtrl',function($scope,middleware,Colors,$analytics,$location){
  $analytics.pageTrack($location.path());
  $scope.color = Colors.getHeaderColor();
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

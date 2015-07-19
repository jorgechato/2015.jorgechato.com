angular.module('orggue')
.controller('workCtrl',function($scope,middleware){
  $scope.repos = [];

  $scope.$on('StartGithub',function(){
    $scope.repos= [];
  });

  $scope.$on('EndGithub',function(err,data){
    angular.forEach(data.repos,function(repo){
      $scope.repos.push(repo);
    });
  });
});

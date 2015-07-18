angular.module('orggue')
.controller('workCtrl',function($scope){
  $scope.repos = [];

  $scope.$on('StartGithub',function(){
    $scope.repos = [];
  });

  $scope.$on('EndGithub',function(err,data){
    angular.forEach(data.repos,function(repo){
      //console.log(repo);
      $scope.repos.push(repo);
    });
  });
});

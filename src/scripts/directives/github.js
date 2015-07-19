angular.module('orggue')
.directive('github',function(Config){
  return{
    restrict : 'E',
    replace : true,
    templateUrl : Config.baseViews + 'github/index.html',
    controller : function($scope){
      $scope.repos = [];

      $scope.$on('StartGithub',function(){
        $scope.repos = [];
      });

      $scope.$on('EndGithub',function(err,data){
        angular.forEach(data.repos,function(repo){
          $scope.repos.push(repo);
        });
      });
    }
  };
});

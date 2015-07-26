angular.module('orggue')
.directive('github',function(Config){
  return{
    restrict : 'E',
    replace : true,
    scope: {repo: '='},
    templateUrl : Config.baseViews + 'github/index.html',
    controller : function($scope,Colors){
      $scope.languageColor = function(language){
        return Colors.getColor(language);
      };
    }
  };
});

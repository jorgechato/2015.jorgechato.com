angular.module('orggue')
.directive('instagram',function(Config){
  return{
    restrict : 'E',
    replace : true,
    scope: {picture : '='},
    templateUrl : Config.baseViews + 'instagram/index.html',
    controller : function($scope){
    }
  };
});

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

      $scope.isMobile = function() {
        if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
          return true;
        }else return false;
      };
    }
  };
});

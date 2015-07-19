angular.module('orggue')
.directive('orggueheader',function(Config){
  return{
    restrict : 'E',
    replace : true,
    templateUrl : Config.baseViews + 'element/header.html',
    controller : function($scope,Colors,Sentence){
      $scope.changeQA = function(){
        var sentence = Sentence.getRandomSentence();
        $scope.question = sentence[0];
        $scope.answer = sentence[1];
      };

      $scope.changeQA();

      $scope.color = Colors.getHeaderColor();

      Array.prototype.inArray = function(comparer) {
        for(var i=0; i < this.length; i++) {
          if(comparer(this[i])){
            this[i].count++;
            return true;
          }
        }
        return false;
      };

      Array.prototype.pushIfNotExist = function(element, comparer) {
        if (!this.inArray(comparer)) {
          this.push(element);
        }
      };

      $scope.$on('EndGithub',function(err,data){
        var total = 0;
        $scope.languages = [];
        angular.forEach(data.repos,function(repo){
          if(repo.language !== null){
            var element = {
              'name' : repo.language,
              'color' : Colors.getColor(repo.language),
              'count' : 1
            };

            $scope.languages.pushIfNotExist(element, function(e) {
              return e.name === element.name && e.color === element.color;
            });
            total++;
          }
        });
        $scope.width = 100/total;
      });
    }
  };
});

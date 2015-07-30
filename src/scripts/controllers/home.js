angular.module('orggue')
.controller('homeCtrl',function($scope,Colors,middleware){
  $scope.color = Colors.getHeaderColor();

  $scope.isMobile = function() {
    if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
      return true;
    }else return false;
  };

  $scope.contact = {
    name : "",
    email : "",
    category : $scope.activeTab
  };

  //send form
  $scope.sendContact = function(){
    $scope.contact.category = $scope.activeTab;
    middleware.setFilter('url','email');
    middleware.setFilter('name',$scope.contact.name);
    middleware.setFilter('email',$scope.contact.email);
    middleware.setFilter('category',$scope.contact.category);
    //middleware.email();
    console.log($scope.contact);
  };
});

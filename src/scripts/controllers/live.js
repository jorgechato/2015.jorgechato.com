angular.module('orggue')
.controller('liveCtrl',function($scope,middleware){
  $scope.instagram = [];

  var getImages = function(){
    middleware.setFilter('url','instagarm/media');
    middleware.instagram();
  };

  getImages();

  $scope.$on('StartInsta',function(){
    $scope.instagram = [];
  });

  $scope.$on('EndInsta',function(err,data){
    angular.forEach(data.insta,function(picture){
      $scope.instagram.push(picture);
    });
  });
});

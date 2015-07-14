angular.module("orggue", ['ui.router','ngRoute','ngAnimate'])
.costant('Config',{
  apiBase : '/api/'
})
.config(function($stateProvider,$urlRouterProvider,$locationProvider){
  $stateProvider
  .state('home',{
    url : "/",
    controller : "homeCtrl",
    templateUrl : "../views/element/home.html"
  });
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
})
.run(function(Colors){
  Colors.setHeaderColor(getRandomColor());
});

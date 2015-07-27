angular.module("orggue", ['ui.router','ngRoute','ngAnimate'])
.constant('Config',{
  apiBase : '/api/',
  baseViews : '../views/'
})
.config(function(Config,$stateProvider,$urlRouterProvider,$locationProvider){
  $stateProvider
  .state('work',{
    url : "/work",
    controller : 'workCtrl',
    templateUrl : Config.baseViews + "element/work.html"
  })
  .state('live',{
    url : "/live",
    controller : 'liveCtrl',
    templateUrl : Config.baseViews + "element/live.html"
  })
  .state('home',{
    url : "/",
    controller : 'homeCtrl',
    templateUrl : Config.baseViews + "element/home.html"
  });
  $urlRouterProvider.otherwise('/work');

  $locationProvider.html5Mode(true);
})
.run(function(Colors,middleware){
  Colors.setHeaderColor(Colors.getRandomColor());
  middleware.setFilter('url','github/repos');
  middleware.github();
});

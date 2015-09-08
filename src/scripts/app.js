angular.module("orggue", ['ui.router','ngRoute','ngAnimate','angulartics','angulartics.google.analytics'])
.constant('Config',{
  apiBase : '/api/',
  baseViews : '../views/'
})
.config(function(Config,$stateProvider,$urlRouterProvider,$locationProvider,$analyticsProvider){
  $stateProvider
  .state('work',{
    url : "/work",
    controller : 'workCtrl',
    templateUrl : Config.baseViews + "element/work.html"
  })
  .state('movies',{
    url : "/movies",
    //controller : 'moviesCtrl',
    //templateUrl : Config.baseViews + "element/movies.html"
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
  //google analytics turn off automatic tracking
  $analyticsProvider.virtualPageviews(false);
})
.run(function(Colors,middleware){
  Colors.setHeaderColor(Colors.getRandomColor());
  middleware.setFilter('url','github/repos');
  middleware.github();
});

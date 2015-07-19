angular.module('orggue')
.service('middleware',function($http,api,$rootScope){
  var backupGithub = [];
  var backupInstagram = [];

  var filters = {
    url : 'github/repos',
    reponame : ''
  };

  var github = function(filters,callback){
    var params = {
      reponame : filters.reponame
    };

    return api.call(filters.url,params,{},function(data){
      if (typeof callback == 'function') {
        callback(data);
      }
    });
  };

  var instagram = function(filters,callback){
    var params = {
    };

    return api.call(filters.url,params,{},function(data){
      if (typeof callback == 'function') {
        callback(data);
      }
    });
  };

  return {
    github : function(){
      $rootScope.$broadcast('StartGithub');
      var repo = github(filters,function(data){
        $rootScope.$broadcast('EndGithub', {repos: data});
      });

      backupGithub.push(repo);
    },
    instagram : function(){
      $rootScope.$broadcast('StartInsta');
      var picture = instagram(filters,function(data){
        $rootScope.$broadcast('EndInsta', {insta: data});
      });

      backupInstagram.push(picture);
    },
    setFilter: function (key, value) {
      filters[key] = value;
    },
    getFilter: function (key) {
      return filters[key];
    },
    getAllFilters: function () {
      return filters;
    },
    filters: filters
  };
});

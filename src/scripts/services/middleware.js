angular.module('orggue')
.service('middleware',function($http,api,$rootScope){
  var backupGithub = [];

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

  return {
    github : function(){
      $rootScope.$broadcast('StartGithub');
      var repo = github(filters,function(data){
        $rootScope.$broadcast('EndGithub', {repos: data});
      });

      backupGithub.push(repo);
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

angular.module('orggue')
.service('middleware',function($http,api,$rootScope){
  var backupGithub = [];
  var backupInstagram = [];

  var filters = {
    url : 'github/repos',
    reponame : '',
    name : '',
    email : '',
    category : 'work'
  };

  var github = function(filters,callback){
    var params = {
      reponame : filters.reponame
    };
    backupGithub = [];

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

  var email = function(filters,callback){
    var params = {
      email : filters.email,
      name : filters.name,
      category : filters.category
    };

    return api.call(filters.url,params,{},function(data){
      if (typeof callback == 'function') {
        callback(data);
      }
    },'POST');
  };

  return {
    email : function(){
      var send = email(filters);
    },
    github : function(){
      $rootScope.$broadcast('StartGithub');
      var repo = github(filters,function(data){
        $rootScope.$broadcast('EndGithub', {repos: data});

        backupGithub = data;
      });
    },
    getReposBackup : function(){
      return backupGithub;
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

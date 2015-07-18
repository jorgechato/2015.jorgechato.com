var express = require('express'),
Github = require('octonode');

//Local variables
var options = [];

if(process.env.id === undefined){
  var config = require('../../config.json');
}

var options = {
  username : process.env.username || config.env.username,
  password : process.env.password || config.env.password
};

var client = Github.client(options);
var myWork = client.me();

var app = express();
var Config = require('../config');

app.get('/api/github/user',function(req, res){
  client.get('/user', {}, function (err, status, body, headers) {
    res.status(200)
    .json(body);
  });
});

app.get('/api/github/repos',function(req, res){
  getRepos(function(repositories){
    res.status(200)
    .json(repositories);
  });
});

app.get('/api/github/Languages',function(req, res){
  getLanguage(req.query.reponame,function(languages){
    res.status(200)
    .json(languages);
  });
});

var getRepos = function(callback){
  myWork.repos(function(err, body, status, headers){
    if(!err){
      Config.getLogger("[GET] "+status.status,"Get all repositories "+status.date);
      var repositories = [];

      body.forEach(function(item,index){
        if(item.owner.login !== "Ziao" && item.owner.login !== "mattygug" && item.owner.login !== "dashmote") {
          var repo = {
            "owner" : {
              "name" : item.owner.login,
              "url" : item.owner.html_url,
              "img" : item.owner.avatar_url
            },
            "language" : item.language,
            "name" : item.name,
            "full_name" : item.full_name,
            "description" : item.description,
            "created" : item.created_at,
            "updated" : item.updated_at,
            "url" : item.html_url,
            "private" : item.private
          };
          repositories.push(repo);
        }
      });
      if (typeof callback == 'function') callback(repositories);
    }else{
      Config.getLogger("ERROR",err);
      if (typeof callback == 'function') callback({});
    }
  });
};

var getLanguage = function(reponame, callback){
  var myRepo = client.repo(reponame);

  myRepo.languages(function(err, body, status, headers){
    if(!err){
      if(typeof callback == 'function') callback(body);
    } else{
      Config.getLogger("ERROR",err);
      if(typeof callback == 'function') callback({});
    }
  });
};

app.get('/api/github/readme',function(req, res){
  var myRepo = client.repo(req.query.reponame);

  myRepo.readme(function(err, body, status, headers){
    if(!err){
      Config.getLogger("[GET] "+status.status,"Readme recivido "+status.date);
      res.status(200)
      .json(body);
    } else return [];
  });
});

module.exports = app;

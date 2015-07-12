var express = require('express'),
Github = require('octonode');

//Local variables
var options = [];

if(process.env.consumer_key === undefined){
  var config = require('../../config.json');
  options = {
    username : config.env.username,
    password : config.env.password
  };
}else{
  options = {
    id: process.env.id || config.env.id,
    secret: process.env.secret || config.env.secret
  };
}

var client = Github.client(options);
var myWork = client.me();

var app = express();
var config = require('../config');

app.get('/api/github/user',function(req, res){
  client.get('/user', {}, function (err, status, body, headers) {
    res.status(200)
    .json(body);
  });
});

app.get('/api/github/repos',function(req, res){
  myWork.repos(function(err, body, status, headers){
    res.status(200)
    .json(body);
  });
});

app.get('/api/github/repo',function(req, res){
  var myRepo = client.repo(req.query.username + "/" + req.query.name);

  myRepo.languages(function(err, body, status, headers){
    res.status(200)
    .json(body);
  });
});

module.exports = app;

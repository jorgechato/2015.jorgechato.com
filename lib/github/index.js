var express = require('express'),
Github = require('octonode');

if(process.env.consumer_key === undefined){
  var config = require('../../config.json');
}

var client = Github.client({
  id: process.env.id || config.env.id,
  secret: process.env.secret || config.env.secret
});

var app = express();
var config = require('../config');

app.get('/api/github/',function(req, res){
  res.status(200)
  .set('Content-Type','application/json')
  .json({});
});

module.exports = app;

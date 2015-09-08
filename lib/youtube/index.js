var express = require('express'),
google = require('googleapis');

//Local variables
var youtube = google.youtube('v3');
if(process.env.id === undefined){
  var config = require('../../config.json');
}

//youtube auth
var authClient = new google.auth.JWT(
  process.env.youtubeUser || config.env.youtubeUser,
  null,
  process.env.youtubePass || config.env.youtubePass,
  [
    'https://www.googleapis.com/auth/youtube',
    'https://www.googleapis.com/auth/youtube.force-ssl',
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/youtubepartner'
  ],
  null
);

var app = express();
var Config = require('../config');

app.get('/api/youtube/media',function(req, res){
  authClient.authorize(function(err, tokens) {
    if (err) {
      console.log("auth not working",err);
      return;
    }

    //Params to youtube serach
    var params = {
      auth: authClient,
      part: 'snippet',
      playlistId: process.env.playlistId || config.env.playlistId
    };

    youtube.playlists.list(params, function(err, resp) {
      console.log(resp);
      console.log(err);
    });
  });
});

module.exports = app;

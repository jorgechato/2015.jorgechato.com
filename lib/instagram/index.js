var express = require('express'),
Instagram = require('instagram-node').instagram();

//Local variables
if(process.env.id === undefined){
  var config = require('../../config.json');
}

var options = {
  access_token : process.env.token|| config.env.token,
  client_id : process.env.client_id || config.env.client_id ,
  client_secret : process.env.client_secret || config.env.client_secret
};

Instagram.use(options);

var app = express();
var Config = require('../config');

app.get('/api/instagarm/media',function(req, res){
  Instagram.user_self_media_recent(function(err, medias, pagination, remaining, limit){
    if(!err){
      Config.getLogger("[GET] 200 ok","Imagenes y videos recividos de INSTAGRAM");
      var instagram = [];

      medias.forEach(function(item, index){
        var video = item.videos ? true : false;

        var media = {
          "location" : null,
          "date" : item.created_time,
          "url" : item.link,
          "video" : video,
          "images" : item.images
        };
        if(item.location !== null && "name" in item.location) media.location = item.location.name;
        instagram.push(media);
      });
      res.status(200)
      .json(instagram);
    }else Config.getLogger(response,error);
  });
});

module.exports = app;

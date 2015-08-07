var express = require('express');
//Local variables
if(process.env.id === undefined){
  var config = require('../../config.json');
}
var key = process.env.mandrillkey || config.env.mandrillkey;
mandrill = require('node-mandrill')(key);

var app = express();
var Config = require('../config');

app.post('/api/email',function(req, res){
  if(req.query.category.toString() !== '' && req.query.email.toString() !=='' && req.query.name.toString() !==''){
    mandrill('/messages/send', {
      message: {
        to: [{email: 'jorgechato1@gmail.com', name: 'Jorge Chato'}],
        headers: {
          "Reply-To": req.query.email.toString()
        },
        metadata: {
          website: "www.jorgechato.com"
        },
        from_email: 'hi@jorgechato.com',
        from_name: req.query.name.toString(),
        subject: req.query.category.toString().toUpperCase()+" "+req.query.email.toString(),
        text: "Category : "+req.query.category.toString()+"\nEmail : "+req.query.email.toString()+"\nName : "+req.query.name.toString(),
        track_opens: true,
        track_clicks: true,
      }
    },function(error, response){
      res.status(201)
      .json(response);
    });
  }
});

module.exports = app;

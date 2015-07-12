var express = require('express'),
winston = require('winston');

var needLogs = false;
if(process.env.consumer_key === undefined && needLogs){
  var logConfig = require('../../logConfig.json');
}

var app = express();

if(needLogs){
  var Papertrail = require('winston-papertrail').Papertrail;

  var logger = new winston.Logger({
    transports : [
      new winston.transports.Papertrail({
      host: process.env.url_log || logConfig.env.url_log,
      port: process.env.port_log || logConfig.env.port_log,
      logFormat: function(level, message) {
        return '<<<' + level + '>>> ' + message;
      }
    })
    ]});
}


module.exports = {
  getLogger : function(action,message){
    if(needLogs) logger.info('\n'+action+':' + message);
    else console.log('<<< NO LOGGER >>>\n'+action+': '+message);
  }
};

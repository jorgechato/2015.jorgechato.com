var express = require('express'),
cors = require('cors'),
compression = require('compression'),
bodyParser = require('body-parser');

var app = express();

//Config views
app.set('view engine','html');
app.set('views','./dist/views');

app.set('port', (process.env.PORT || 5000));

//Cors and init json Middleware
app.use(bodyParser.json('application/json'));
app.use(cors());

//Static files
app.use(compression());
app.use(express.static('./dist'));

var config = require('./lib/config');

var github = require('./lib/github');
app.use(github);

var instagram = require('./lib/instagram');
app.use(instagram);

app.use(function(req, res){
  res.sendFile(__dirname+'/dist/views/index.html');
});

app.listen(app.get('port'), function() {
  config.getLogger('start',"Node in "+app.settings.env+" mode at http://localhost:" +app.get('port'));
});

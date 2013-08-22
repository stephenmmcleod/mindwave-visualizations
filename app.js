
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var stylus = require('stylus');
var nib = require('nib');

var app = express();

/**
 * Variables
 */

var mindwaveData = {};


function compile(str, path) {
  return stylus(str)
    .define('url', stylus.url({
      paths : [__dirname + "/public"],
      limit : 10000
    }))
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}

/**
 * Variables
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



app.get('/', routes.index);
app.get('/circle', routes.circle);
app.get('/meditation', routes.meditation);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



/**
 * Socket.IO
 */

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  socket.emit('startMindwave', true);
  socket.on('getMindwave', function (data) {
  	socket.emit('updateMindwave', mindwaveData);
    // console.log(data);
  });
});



/**
 * ThinkGear
 */

var nodeThinkGear = require('node-neurosky');

var tgClient = nodeThinkGear.createClient({
	appName:'NodeThinkGear',
	appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
});

tgClient.on('data',function(data){
	mindwaveData = data;
});

tgClient.connect();
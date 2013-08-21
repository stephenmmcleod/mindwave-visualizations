var express = require("express");
var app = express()
	, server = require('http').createServer(app)
  , io = require('socket.io').listen(server);


app.listen(8003);
console.log('Listening on port 8003');


 
var nodeThinkGear = require('node-neurosky');

var tgClient = nodeThinkGear.createClient({
	appName:'NodeThinkGear',
	appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
});

tgClient.on('data',function(data){
	console.log(data);
});

tgClient.connect();

// app.get('/', function (req, res) {
//   res.send('Hello World');
// });
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
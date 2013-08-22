var socket = io.connect('http://localhost:3000/');
var waveData = {};
var blinking = false;

setInterval(function(){
  socket.emit('getMindwave', { success: true });
},100);




var socket = io.connect('http://localhost:3000/');
var waveData = {};
var blinking = false;

setInterval(function(){
  socket.emit('getMindwave', { success: true });
},100);

// socket.on('updateMindwave', function (data) {
//   if (data['blinkStrength'] == null) {
//     waveData = data;
//     blinking = false;
//   } else {
//     blinking = data['blinkStrength'];
//   }
//   console.log(waveData);
//   console.log(blinking);
//   // console.log(data['eegPower']['highGamma']);
//   // data['eSense']['attention']
//   // data['eSense']['meditation']
//   // data['eegPower']['delta']
//   // data['eegPower']['theta']
//   // data['eegPower']['lowAlpha']
//   // data['eegPower']['highAlpha']
//   // data['eegPower']['highBeta']
//   // data['eegPower']['highBeta']
//   // data['eegPower']['highGamma']
//   // data['eegPower']['highGamma']
//   // 

// });
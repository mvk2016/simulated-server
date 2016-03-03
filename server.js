/**
 * Created by Johan on 2016-02-29.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var list = require('./generatingjson');
var getRandomInt = require('./randint');

var sockets = [];


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  sockets.push(socket);
  console.log(sockets.length);

  socket.on('disconnect', function() {
    sockets.splice(sockets.indexOf(socket), 1);
    console.log(sockets.length)
  });
});


function spewData() {
  sockets.map(function(socket){
    socket.emit('event', list[getRandomInt(0, list.length - 1)]);
  });
}

http.listen(8000, function(){
  console.log('listening to port 8000');
});

setInterval(spewData, 1000);

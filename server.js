/**
 * Created by Johan on 2016-02-29.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var list = require('./generatingjson');
var getRandomInt = require('./randint');

var sockets = [];

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next();
});

app.get('/api/floors/:floorid', function(req, res) {
  res.sendFile(__dirname + '/geo.json')
});

app.get('/api/floors/:floorid/:roomid/history', function(req, res) {
  res.sendFile(__dirname + '/history.json')
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

http.listen(8001, function(){
  console.log('listening to port 8001');
});

setInterval(spewData, 1000);

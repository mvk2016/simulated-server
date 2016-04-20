/**
 * Created by Johan on 2016-02-29.
 */
var app   = require('express')();
var http  = require('http').Server(app);
var io    = require('socket.io')(http);

var change = require('./generatingjson');

var sockets = [];

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next();
});

app.get('/api/buildings/:buildingid/floors', function(req, res) {
    res.send(['testfloor', 1,2,3]);
});

app.get('/api/buildings/:buildingid/floors/:floorid', function(req, res) {

  res.sendFile(__dirname + '/geo.json')
});

app.get('/api/rooms/:roomid/history', function(req, res) {
  res.send(change.historic())
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
    var obj = change.generate();
    socket.emit('event', obj);
  });
}

http.listen(8001, function(){
  console.log('listening to port 8001');
});

setInterval(spewData, 1000);

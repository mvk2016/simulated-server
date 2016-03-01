/**
 * Created by Johan on 2016-02-29.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sockets = [];

var gen = require('./generatingjson.js');
gen.start();
console.log(gen.propertyList);


app.get('/', function(req, res){
    res.sendFile(__dirname + '/geojson.json');
});

io.on('connection', function(socket){
        sockets.push(socket);
        console.log(sockets.length);
        });

http.listen(8000, function(){
        console.log('listening to port 8000');
});


setInterval(spewData, 1000);


function spewData () {
    sockets.map(function(socket){
        socket.emit('event', {for: "everyone"});
    });

}
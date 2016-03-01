/**
 * Created by Johan on 2016-02-29.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sockets = [];

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
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
        socket.emit('event', {for: 'everyone'});
    });

}
var net = require('net');

var endListener   = function() {console.log('server disconnected');}
var errorListener = function() {console.log('some connection error');}
var dataListener  = function(data) {console.log(data.toString());}
var boundListener = function() {console.log('server bound');}

var connListener  = function(c) { //'connection' listener
	console.log('server connected');
	c.on('end', endListener);
	c.on('error', errorListener);
	c.on('data', dataListener); 
}

var server = net.createServer(connListener); 
server.listen(9000, boundListener);
const net = require('net');

args = process.argv.slice(2)
const IP_LOCAL = args[0];
const IP_SERVIDOR = args[1];

const client = net.connect({port:8000}, function() { //connect listener
	console.log('client connected');
	client.write(args);
});

client.on('data', function(data) {
 	console.log(data.toString());
 	client.end(); //no more data written to the stream
});

client.on('end', function() {
	console.log('client disconnected');
});

const net = require('net');

args = process.argv.slice(2)
const IP_PROXY = args[0];
const IP_SERVIDOR = args[1];
const PUERTO_SERVIDOR = args[2];
msg = {
	"remote_ip":IP_SERVIDOR,
	"remote_port":PUERTO_SERVIDOR
}

const client = net.connect({port:8003}, function() { //connect listener
	console.log('client connected');
	client.write(JSON.stringify(msg));
});

client.on('data', function(data) {
 	console.log(data.toString());
 	client.end(); //no more data written to the stream
});

client.on('end', function() {
	console.log('client disconnected');
});

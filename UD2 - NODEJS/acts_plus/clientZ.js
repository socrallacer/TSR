if ( process.argv.length != 3 ) {
   console.log('uso: node clientZ id'); process.exit(0);
}

var net = require('net');
var eve = require('events');
var emitter = new eve.EventEmitter();

// listeners del cliente net
var endListener   = function() {console.log('client disconnected');}
var errorListener = function() {console.log('some connection error');}
var dataListener  = function(data) {console.log(data.toString());}

var id = process.argv[2]; // identificador del cliente
var evNames = ['Temperature', 'Humidity', 'Wind'] // 3 eventos, en evNames

// 3 arrays para valores numericos relativos a eventos 
// [valor_maximo, valor_umbral_1, valor_umbral_2]
var evValues = {}
evValues[evNames[0]] = [50, 30, 40]
evValues[evNames[1]] = [100, 70, 90]
evValues[evNames[2]] = [200, 100, 150]

var client = net.connect( ... );
client.on('data', ... );
client.on('end', ... );
client.on('error', ... );

function getValues() { // simulador de datos
	var a = {};
	for (var t in evNames) {
		var s = evNames[t]; 
		a[s] = parseInt(Math.random() * evValues[s][0]);
	}
	return a;
}

function monitoring() {	
	var a = getValues(); 
	... 
}

function reporting(name, value) { 
	... 
}

for (var t in evNames) { 
	var s = evNames[t]; 
	... 
}

setInterval( ... , 1000)
const net = require('net');
const LOCAL_PORT = 8113;
const LOCAL_IP = '127.0.0.1';
const INPUT_PORT = 8003;
//
//const REMOTE_IP="cdt.gva.es";
//const REMOTE_IP="apache.rediris.es"
let remote_ip="158.42.4.23"

let remote_port="80"
//const REMOTE_IP = '158.42.4.23'; // www.upv.es

const server = net.createServer(function (socketNav) {
 const serviceSocket = new net.Socket();
//se crea socket que conecte con el servidro remoto
 serviceSocket.connect(parseInt(remote_port), remote_ip, function () {
	//cuando el navegador hace una solictud por LOCAL_PORT server envía solicitud al servidor remoto
 	socketNav.on('data', function (msg) {
 	console.log (msg + "HOLAAAAAAAAAA"+"\n")
	//Envío de petición
 	serviceSocket.write(msg);
 });
 	//Cuando socket conectado con el servidor externo recibe data la envía al navegador para mostrarla
 	serviceSocket.on('data', function (data) {
 		socketNav.write(data);
		console.log(data)
 	});
});
}).listen(LOCAL_PORT, LOCAL_IP);
console.log("TCP server accepting connection on port: " + LOCAL_PORT);

//Se crea servidor para controlar las peticiones del programador
const server_prog = net.createServer(function (socketInput) {
		//Cuando se reciba mensaje por el puerto asignado al programador
		//se cambiaran los parámetros de puerto e ip remotos
		socketInput.on('data', function (data) {
			msg = JSON.parse(data);
			remote_port = msg.remote_port;
			remote_ip = msg.remote_ip;
			console.log("\n Nuevo direcionamiento a servidor"+remote_ip+":"+remote_port+"\n")
			socketInput.write("ciao")
		
	});
   }).listen(INPUT_PORT, LOCAL_IP);
   console.log("TCP server accepting connection on port: " + INPUT_PORT);
   
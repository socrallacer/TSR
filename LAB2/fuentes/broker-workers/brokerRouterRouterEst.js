const {zmq, lineaOrdenes, traza, error, adios, creaPuntoConexion} = require('../tsr')
lineaOrdenes("frontendPort backendPort")
let workers  =[] // workers disponibles
let pendiente=[] // peticiones no enviadas a ningun worker
let frontend = zmq.socket('router')
let backend  = zmq.socket('router')
let peticionesWorker = new Map();
let peticiones = 0;
creaPuntoConexion(frontend, frontendPort)
creaPuntoConexion(backend,  backendPort)

function peticionesTotales(){
	peticiones = 0;
	for(const value of peticionesWorker.values()){
		peticiones = peticiones + value;
	}
	console.log("Número de peticiones respondidas en total: " + peticiones);
	}

setInterval(()=>{peticionesTotales()},5000)


function procesaPeticion(cliente,sep,msg) { // llega peticion desde cliente
	traza('procesaPeticion','cliente sep msg',[cliente,sep,msg])
	if (workers.length) backend.send([workers.shift(),'',cliente,'',msg])
	else pendiente.push([cliente,msg])
}
function procesaMsgWorker(worker,sep1,cliente,sep2,resp) {
	traza('procesaMsgWorker','worker sep1 cliente sep2 resp',[worker,sep1,cliente,sep2,resp])
	
	if (pendiente.length) { // hay trabajos pendientes. Le pasamos el mas antiguo al worker
		let [c,m] = pendiente.shift()
		backend.send([worker,'',c,'',m])
	}
	else workers.push(worker) // añadimos al worker como disponible
	
	if (cliente) {
		frontend.send([cliente,'',resp]) // habia un cliente esperando esa respuesta
		if(cliente!=''){
		if(peticionesWorker.has(worker+"")){peticionesWorker.set(worker+"",peticionesWorker.get(worker+"")+1)}
		else {peticionesWorker.set(worker+"",parseInt(1))}
		}
	}
	console.log(peticionesWorker.entries())
}



frontend.on('message', procesaPeticion)
frontend.on('error'  , (msg) => {error(`${msg}`)})
 backend.on('message', procesaMsgWorker)
 backend.on('error'  , (msg) => {error(`${msg}`)})
 process.on('SIGINT' , adios([frontend, backend],"abortado con CTRL-C"))

const {zmq, lineaOrdenes, traza, error, adios, creaPuntoConexion} = require('../tsr')
const ans_interval = 2000 // deadline to detect worker failure
lineaOrdenes("frontendPort backendPort")

let failed   = {}	// Map(worker:bool) failed workers has an entry
let working  = {}	// Map(worker:timeout) timeouts for workers executing tasks
let wClass   = {}	// Map(worker:workerClass) that associates a class to each worker
let pending  = []	// List([client,workerClass,message]) requests waiting for workers
let ready    = {}	// List(worker) ready workers (for load-balancing)
let frontend = zmq.socket('router')
let backend  = zmq.socket('router')

function dispatch(client, workerClass, message) {
	traza('dispatch','client workerClass message',[client,workerClass,message])
	if (ready[workerClass] && ready[workerClass].length) {
		new_task(ready[workerClass].shift(), client, workerClass, message)
	} else {
		pending.push([client,workerClass,message])
	}
}
function new_task(worker, client, workerClass, message) {
	traza('new_task','client workerClass message',[client,workerClass,message])
	working[worker] = setTimeout(()=>{failure(worker,client,workerClass,message)}, ans_interval)
	backend.send([worker,'', client,'', message])
}
function failure(worker, client, workerClass, message) {
	traza('failure','client message',[client,workerClass,message])
	failed[worker] = true
	dispatch(client, workerClass, message)
}
function frontend_message(client, sep, workerClass, message) {
	traza('frontend_message','client sep workerClass message',[client,sep,workerClass,message])
	dispatch(client, workerClass+"", message)
}
function backend_message(worker, sep1, client, sep2, message) {
	traza('backend_message','worker sep1 client sep2 message',[worker,sep1,client,sep2,message])
	if (failed[worker]) return  // ignore messages from failed nodes
	if (worker in working) { // task response in-time
		clearTimeout(working[worker]) // cancel timeout
		delete(working[worker])
	}
	if (client+"" != "") frontend.send([client,'',message])
	else {
		wClass[worker+""] = message+""
	}
	if (pending.length && pending[0][1]==wClass[worker+""]) {
		new_task(worker, ...pending.shift())
	} else {
		if (!ready[wClass[worker+""]])
			ready[wClass[worker+""]]=[]
		ready[wClass[worker+""]].push(worker)
	}
}

frontend.on('message', frontend_message)
 backend.on('message', backend_message)
frontend.on('error'  , (msg) => {error(`${msg}`)})
 backend.on('error'  , (msg) => {error(`${msg}`)})
 process.on('SIGINT' , adios([frontend, backend],"abortado con CTRL-C"))
 
creaPuntoConexion(frontend, frontendPort)
creaPuntoConexion( backend,  backendPort)

const {zmq, error, lineaOrdenes, traza, adios, creaPuntoConexion} = require('../tsr')

let port = process.argv[2]
let numMensajes = process.argv[3]
let temas = process.argv.slice(4)

var pub = zmq.socket('pub')

creaPuntoConexion(pub, port)

function envia(tema, numMensaje, ronda) {
	traza('envia','tema numMensaje ronda',[tema, numMensaje, ronda])
	pub.send([tema, numMensaje, ronda]) 
}
function publica(i) {
	return () => {
		envia(temas[i%temas.length], i, Math.trunc((i/temas.length)+1))
		if (i==numMensajes-1) adios([pub],"No me queda nada que publicar. Adios")()
		else setTimeout(publica(i+1),1000)
	}
}
setTimeout(publica(0), 1000)

pub.on('error', (msg) => {error(`${msg}`)})
process.on('SIGINT', adios([pub],"abortado con CTRL-C"))
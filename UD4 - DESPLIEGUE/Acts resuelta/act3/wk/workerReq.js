const {zmq, lineaOrdenes, traza, error, adios, conecta} = require('../tsr')
lineaOrdenes("brokerHost brokerPort workerClass")
let req = zmq.socket('req')
let id  = "W_"+require('os').hostname()
req.identity = id+Math.ceil(Math.random()*1000)

conecta(req, brokerHost, brokerPort)
req.send(['','', workerClass+''])

function procesaPeticion(cliente, separador, mensaje) {
        traza('procesaPeticion','cliente separador mensaje',[cliente, separador, mensaje])
        setTimeout(()=>{req.send([cliente,'',`${mensaje} ${id}`])}, 1000)
}
req.on('message', procesaPeticion)
req.on('error', (msg) => {error(`${msg}`)})
process.on('SIGINT', adios([req],"abortado con CTRL-C"))

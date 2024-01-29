const {zmq, lineaOrdenes, traza, error, adios, conecta} = require('../tsr')
lineaOrdenes("brokerHost brokerPort workClass")
let req = zmq.socket('req')
let id  = "C_"+require('os').hostname()
req.identity = id+Math.ceil(Math.random()+2000)
conecta(req, brokerHost, brokerPort)

req.send([workClass+"", "C_"+require('os').hostname()])

function procesaRespuesta(msg) {
        traza('procesaRespuesta','msg',[msg])
        adios([req], `Recibido: ${msg}. Adios`)()
}
req.on('message', procesaRespuesta)
req.on('error', (msg) => {error(`${msg}`)})
process.on('SIGINT', adios([req],"abortado con CTRL-C"))


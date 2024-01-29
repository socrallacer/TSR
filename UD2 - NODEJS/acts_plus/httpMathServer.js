// httpMathServer.js

const http = require('http')
const net = require('net') 
const querystring = require('querystring')
const form = require('fs').readFileSync('formulario.html')

if (process.argv.length != 4) {
    console.log("Two arguments, httpPort and netPort, are needed")
    process.exit()
}

var host = '127.0.0.1'
var httpPort = Math.abs(parseInt(process.argv[2])) 
var netPort  = Math.abs(parseInt(process.argv[3])) 

var end_listener = ...
var error_listener = ...
var data_listener = ...

var server = http.createServer(function(request, response) { 
    if (request.method === "POST") { 
        var dataPost = ''
        request.on('data', function(data) { ... })
        request.on('end', function() { 
            ...
            let client = net.createConnection({port: netPort}, ... )             
            client.on('end', end_listener)
            client.on('error', error_listener)
            client.on('data', data_listener( ... )) // closure
        })
    } 
    if (request.method === "GET") { 
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end(form)
    }
})

server.listen(httpPort, hostname, function() {
    console.log('http server running at http://'+ host + ':' + httpPort + '/')
})
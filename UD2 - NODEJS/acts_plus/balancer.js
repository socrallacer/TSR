// balancer.js

const net = require('net')

if (process.argv.length != 5) {
    console.log("Three arguments ... are needed"); process.exit()
}

let netPort0 = Math.abs(parseInt(process.argv[2])) 
let netPort1 = Math.abs(parseInt(process.argv[3])) 
let netPort2 = Math.abs(parseInt(process.argv[4])) 

let server_bound_listener = ...
let server_end_listener = ...
let client_end_listener = ...
let server_error_listener = ...
let client_error_listener = ...

let client_data_listener = function( ... ) {
    return function(data) { ... }
}

let server_data_listener = function(c) {
    return function(data) {
        ...
        let client = net.createConnection({port: ... }, function() { ... })         
        client.on('end', client_end_listener)
        client.on('error', client_error_listener)
        client.on('data', client_data_listener( ... )) // closure
    }
}

let server = net.createServer(function(c) {
    c.on('end', server_end_listener)
    c.on('error', server_error_listener)
    c.on('data', server_data_listener(c)) // closure
})

server.listen(netPort0, server_bound_listener)
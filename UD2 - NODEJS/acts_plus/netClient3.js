/***************************************************
// netClient3.js
// 3.6 NodeJS. Módulo net. Ejemplo 3
// transparencia 37 del tema 2. ejemplo ampliado.
***************************************************/

const net = require('net')  

if (process.argv.length != 4) {
    console.log("Two arguments, function and number, are needed")
    process.exit()
}

let fun = process.argv[2]
let num = Math.abs(parseInt(process.argv[3]))

// The server is in our same machine.
let client = net.connect({port: 9000},
   function() {
      console.log('client connected')
      let request = {"fun":fun, "num":num}
      client.write(JSON.stringify(request))
}) 

client.on('data', function(data) {
  console.log(data.toString())
  client.end()
})

client.on('end', function() {
  console.log('client disconnected')
})

client.on('error', function() {
  console.log('some connection error')
})
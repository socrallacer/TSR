// subextra.js
const zmq = require('zeromq')
const subscriber = zmq.socket('sub')
// Check how many arguments have been received.
if (process.argv.length != 4) {
	console.error("Format is 'node subextra URL topic'")
	console.error("Example: 'node subextra tcp://localhost:9999 sport'")
	process.exit(1)
}
// Get the connection URL.
const url = process.argv[2]
// Get topic
const topic = process.argv[3]

subscriber.on('message', function(data) {
	console.log('Received '+data)
})

subscriber.connect(url)
subscriber.subscribe(topic)

// pubextra.js
const zmq = require('zeromq')
const publisher = zmq.socket('pub')
// Check how many arguments have been received.
if (process.argv.length < 5) {
	console.error("Format is 'node pubextra URL secs topics+'")
	console.error("Example: 'node pubextra tcp://*:9999 2 sport science society'")
	process.exit(1)
}

// Get the connection URL.
const url = process.argv[2]
// Get period
const period = process.argv[3]
// Get topics
const topics = process.argv.slice(4)
let i=0
let count=0

publisher.bind(url, function(err) {
	if(err) console.log(err)
	else console.log('Listening on '+url+' ...')
})

setInterval(function() {
	++count
	publisher.send(topics[i]+' msg '+count)
	console.log('Sent '+topics[i]+' msg '+count)
	i=(i+1)%topics.length
	// Uncomment next line in order to limit the amount of sent messages.
	// if (count>100) process.exit()
},period*1000)

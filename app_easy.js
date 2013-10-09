var connect = require('connect'),
	fs = require('fs'),
	util = require('util'),
	io = require('socket.io').listen(9001), // WS port
	port = 9000; // HTTP port

connect.createServer(
	connect.static(__dirname + '/public') // two underscores
).listen(port);

util.log('the server is running on port: ' + port);

// file system tricks

// write a file

// // socket stuff

io.sockets.on('connection', function (socket) {

	util.log('Ooooooh, someone just poked me :)');

	socket.emit('hey boys', {
		'msg': 'what\'s up girls?'
	});

	socket.on('hey girls', function(data) {
		var filePath = 'data/someFile.txt';
		var stream = fs.createWriteStream(filePath);
		stream.once('open', function() {
		time = new Date().getTime();
		text = data.msg;
		stream.write('The client has connected at ' + time + ' with the message: ' + text);
		stream.end();
	});
	});

	// socket.on('whoa', function(data) {
	// 	util.log(data);
	// });
});





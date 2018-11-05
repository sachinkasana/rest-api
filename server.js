const express = require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
const config = require('./config/config.json');
var cors = require('cors')
const app = express();

var server = require('http').createServer(app);  
var io = require('socket.io')(server);

io.use(function(socket,next){
  if( socket.handshake.query && socket.handshake.query.token){
    jwt.verify(socket.handshake.query.token,config.secret,function(err,decoded){
      if(err){ console.log(err); return next(new Error('Authentication Error'));}
      socket.decoded=decoded;
      next();
    })
  }
  else{
    console.log('Authentication Error');
    next(new Error('Authentication Error'));
  }
})

Stopwatch = require('./utils/stop.watch');

var startTime;
var stopwatch = new Stopwatch();
stopwatch.on('tick:stopwatch', function(time) {
  io.sockets.emit('time', { time: time });
});

stopwatch.on('reset:stopwatch', function(time) {
  io.sockets.emit('time', { time: time });
});

// 5 mins
stopwatch.setTime(3000);

// stopwatch.start();

io.sockets.on('connection', function (socket) {
  io.sockets.emit('time', { time: stopwatch.getTime() });

  socket.on('click:start', function () {
    stopwatch.start();
  });

  socket.on('click:stop', function () {
    stopwatch.stop();
  });

  socket.on('click:reset', function () {
    stopwatch.reset();
  });

	socket.on('click:setTime', function(ms) {
		stopwatch.stop();
		stopwatch.setTime(ms);
		io.sockets.emit('time', {time: stopwatch.getTime() });
	});
});

// io.on('connection', (socket) => {
//   console.log('new connection made');
  
//   socket.on('event1', (data) => {
//     console.log(data.msg);
//   });
  
//   socket.emit('event2', {
//     msg: 'Server to client, do you read me? Over.'
//   });
  
//   socket.on('event3', (data) => {
//     console.log(data.msg);
//     socket.emit('event4', {
//       msg: 'Loud and clear :)'
//     });
//   });
//   });

const methodOverride = require('method-override')
const errorHandler=require('./utils/error.handler');

const userRoute=require('./routes/user.route');
const questionRoute=require('./routes/question.route');



app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(methodOverride());
app.use(errorHandler.logErrors);
app.use(errorHandler.clientErrorHandler);
app.use(errorHandler.errorHandler);

app.use('/users',userRoute);
app.use('/questions',questionRoute);

const PORT = 3000;
server.listen(PORT, function () {
  console.log('server is running on port', PORT)
});

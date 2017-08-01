var express=require('express')
var path=require("path")
var ejs=require('ejs')

var app=express(),
	server=require('http').createServer(app),
	io=require('socket.io').listen(server);

var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('../webpack.config.js');

var compiler = webpack(webpackDevConfig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: "http://localhost:8080",
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

server.listen(8080,function(){
	console.log("OK")
});

app.get('/',function(req,res){
	res.render('index')
})

app.set('views','./client/build/js/')
app.set("view engine",'html')
app.engine('html',ejs.renderFile)
/*app.use('/static',express.static('./client/build'))*/

var userNumber=0;
io.sockets.on("connection",function(socket){
	console.log('client connected');
	var signedIn=false;

	socket.on("newMessage",function(text){	
		io.sockets.emit("newMessage",{
			userName:text.userName,
			text:text.message
		})
	})
	
	socket.on("signIn",function(userName){
		if(signedIn){
			return;
		}

		socket.userName=userName;
		++userNumber;
		signedIn=true;

		io.sockets.emit('userJoined',{
			userName:socket.userName,
			userNumber:userNumber
		})
	})

	socket.on("disconnect",function(){
		if(signedIn){
			--userNumber;
			io.sockets.emit("userLeft",{
				userName:socket.userName,
				userNumber:userNumber
			})
		}
	})
})
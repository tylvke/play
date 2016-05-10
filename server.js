"use strict"
var xtpl=require('xtpl/lib/koa');

var app = require('koa')(),
    router = require('koa-router'),
    serve = require('koa-static'),
    views = require('koa-views');

// Send static files
app.use(serve('./public'));

// Use jade
app.use(views(__dirname +'/views', 'jade', {}));

// Router
app.use(router(app));

// This must come after last app.use()
var server = require('http').Server(app.callback()),
    io = require('socket.io')(server);

/**
 * Routes can go both before and after but
 * app.use(router(app)); must be before
 */
xtpl(app,{
    views:'app/views',
    extname:"html"
});

app.get('/', function *(next) {
    yield this.render('index', { my: 'data' });
});

// Socket.io
io.on('connection', function(socket){
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

// Start the server
server.listen(1337);
console.info('Now running on localhost:1337');
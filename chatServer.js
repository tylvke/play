module.exports=function(server){
        io = require('socket.io')(server);

    var user_list=[];

    var users={};

    var roomUser={};
    io.sockets.on('connection', function(socket) {
        //new user login
        socket.on('login', function(nickname) {
            if (user_list.indexOf(nickname) > -1) {
                socket.emit('nickExisted');
            } else {
                socket.userIndex = users.length;
                socket.nickname = nickname;
                user_list.push(nickname);
	    	    users[nickname]=socket;
                socket.emit('loginSuccess');
                io.sockets.emit('system', nickname, user_list.length, 'login');
            }
        });
        //点对点聊天
        socket.on('whisper', function (from,to,msg) {
            console.log('I received a private message by ', from, ' say to ',to, msg);
            if(to in users_list){
                users_list[to].emit("whisper",{mess:msg});
            }
        });
        //user leaves
        socket.on('disconnect', function() {
            users.splice(socket.userIndex, 1);
            socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
        });
        //new message get
        socket.on('postMsg', function(msg) {
            console.log(socket.nickname);
            socket.broadcast.emit('newMsg', socket.nickname, msg);
        });
        //new image get
        socket.on('sendImg', function(imgData) {
            socket.broadcast.emit('sendImg', socket.nickname, imgData);
        });
        //群聊
        socket.on('join', function (username) {
            // 将用户归类到房间
            if (!roomUser[roomid]) {
                roomUser[roomid] = [];
            }
            roomUser[roomid].push(username);
            socket.join(roomid);
            socket.to(roomid).emit('sys', username + '加入了房间');
            socket.emit('sys',user + '加入了房间');
        });
    });
};
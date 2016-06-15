var Chat = function (type) {
    this.socket = null;
    this.last_time;
    this.type=type;
    this.chat_whisper=0;//私聊
    this.chat_room=1;//群聊
};
Chat.prototype = {
    init: function () {
        var self = this;
        this.socket = io.connect();
        this.socket.on('connect', function () {
            document.getElementById('info').textContent = '请输入你的代号';
            document.getElementById('nickWrapper').style.display = 'block';
            document.getElementById('nicknameInput').focus();
        });
        this.socket.on('nickExisted', function () {
            document.getElementById('info').textContent = '代号已存在';
        });
        this.socket.on('loginSuccess', function () {
            document.title = '青春乐园 | ' + document.getElementById('nicknameInput').value;
            document.getElementById('loginWrapper').style.display = 'none';
            document.getElementById('messageInput').focus();
        });
        this.socket.on('error', function (err) {
            if (document.getElementById('loginWrapper').style.display == 'none') {
                document.getElementById('status').textContent = '!fail to connect :(';
            } else {
                document.getElementById('info').textContent = '!fail to connect :(';
            }
        });
        this.socket.on('system', function (nickName, userCount, type) {
            var msg = nickName + (type == 'login' ? ' 加入了房间' : ' 离开的房间');
            self._displayNewMsg('system', msg);
            document.getElementById('status').textContent = "("+userCount + '人在线'+")";
        });

        document.getElementById('loginBtn').addEventListener('click', function () {
            var nickName = document.getElementById('nicknameInput').value;
            if (nickName.trim().length != 0) {
                self.socket.emit('login', nickName);
            } else {
                document.getElementById('nicknameInput').focus();
            }
            ;
        }, false);
        document.getElementById('nicknameInput').addEventListener('keyup', function (e) {
            if (e.keyCode == 13) {
                var nickName = document.getElementById('nicknameInput').value;
                if (nickName.trim().length != 0) {
                    self.socket.emit('login', nickName);
                }
            }
        }, false);

        this.sendImg();
        this.sendEmoji();
        this.sendmsg();
    },
    //发送图片
    sendImg:function(){
        var self=this;
        document.getElementById('sendImage').addEventListener('change', function () {
            if (this.files.length != 0) {
                var file = this.files[0],
                    reader = new FileReader();
                if (!reader) {
                    self._displayNewMsg('system', '!your browser doesn\'t support fileReader', 'red');
                    this.value = '';
                    return;
                }
                reader.onload = function (e) {
                    this.value = '';
                    self.socket.emit('sendImg', e.target.result);
                    self._displayImage('me', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        }, false);
        this.socket.on('sendImg', function (user, img) {
            self._displayImage(user, img);
        });
    },
    //发送表情
    sendEmoji:function(){
        this._initialEmoji();
        document.getElementById('emoji').addEventListener('click', function (e) {
            var emojiwrapper = document.getElementById('emojiWrapper');
            emojiwrapper.style.display = 'block';
            e.stopPropagation();
        }, false);
        document.body.addEventListener('click', function (e) {
            var emojiwrapper = document.getElementById('emojiWrapper');
            if (e.target != emojiwrapper) {
                emojiwrapper.style.display = 'none';
            }
        });
        document.getElementById('emojiWrapper').addEventListener('click', function (e) {
            var target = e.target;
            if (target.nodeName.toLowerCase() == 'img') {
                var messageInput = document.getElementById('messageInput');
                messageInput.focus();
                messageInput.innerHTML = messageInput.innerHTML + '[emoji:' + target.title + ']';
            }
        }, false);
    },
    //发送消息
    sendmsg:function(){
        var self=this;
        document.getElementById('sendBtn').addEventListener('click', function () {
            var messageInput = document.getElementById('messageInput'),
                msg = messageInput.innerHTML;
            messageInput.innerHTML = '';
            messageInput.focus();
            if (msg.trim().length != 0) {
                self.socket.emit('postMsg', msg);
                self._displayNewMsg('me', msg);
                return;
            }
        }, false);
        this.socket.on('newMsg', function (user, msg) {
            self._displayNewMsg(user, msg);
        });
    },
    //私聊
    whisper: function () {
        var self=this;
        document.getElementById('sendBtn').addEventListener('click',function(e){
            var from = document.getElementById("from").value,
                msg  = document.getElementById('message').value,
                to   = document.getElementById('to').value;
            self.socket.emit('whisper',from,to,msg);
        },false);
        this.socket.on('whisper',function(user,msg){
            self._displayNewMsg(user, msg);
        });
    },
    _initialEmoji: function () {
        var emojiContainer = document.getElementById('emojiWrapper'),
            docFragment = document.createDocumentFragment();
        for (var i = 69; i > 0; i--) {
            var emojiItem = document.createElement('img');
            emojiItem.src = '/chat/content/emoji/' + i + '.gif';
            emojiItem.title = i;
            docFragment.appendChild(emojiItem);
        }
        ;
        emojiContainer.appendChild(docFragment);
    },
    dateDiff:function(date_diff){
        //计算出相差天数
        var days=Math.floor(date_diff/(24*3600*1000))
        //计算出小时数
        var leave1=date_diff%(24*3600*1000)    //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000))
        //计算相差分钟数
        var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000))
        //计算相差秒数
        var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000)
        return {
            days:days,
            hours:hours,
            minutes:minutes,
            seconds:seconds
        };
    },
    msg_tpl:function(user,msg){
        var self=this;
        var msg_type="msg-left";
        var msg_tpl=document.createElement("div");
        if(user==="me"){
            msg_type="msg-right"
        }
        if(user=="system"){
            msg_tpl.className="time";
            msg_tpl.innerHTML="<span>"+msg+"</span>"
        }
        else{
            msg_tpl.className="msg-content "+msg_type;
            var tpl='<div class="msg-info">'+
                '<div class="msg-info1">'+msg+
                '</div>'+
                '</div>'+
                '<div class="name">'+user+'</div>';
            msg_tpl.innerHTML=tpl;
        }
        return msg_tpl;
    },
    _displayNewMsg: function (user, msg) {
        var self=this;
        var container = document.getElementById('historyMsg');
        //determine whether the msg contains emoji
        if(self.last_time==undefined){
            self.last_time = new Date();
        }
        else{
            var date = new Date().toTimeString().substr(0, 8);
            var end_date=new Date();
            var date_diff=end_date.getTime()-self.last_time.getTime();
            date_diff=self.dateDiff(date_diff);
            //时间间隔超过一分钟显示时间
            if(date_diff.minutes>1){
                var time=document.createElement("div");
                time.className="time";
                time.innerHTML="<span>"+date+"</span>";
                container.appendChild(time);
            }
        }
        var msg = this._showEmoji(msg);
        var tpl=this.msg_tpl(user,msg);
        container.appendChild(tpl);
        container.scrollTop = container.scrollHeight;
    },
    _displayImage: function (user, imgData) {
        var container = document.getElementById('historyMsg');
        var img='<a href="' + imgData + '" target="_blank"><img src="' + imgData + '"/></a>';
        var tpl=this.msg_tpl(user,img);
        container.appendChild(tpl);
        container.scrollTop = container.scrollHeight;
    },
    _showEmoji: function (msg) {
        var match, result = msg,
            reg = /\[emoji:\d+\]/g,
            emojiIndex,
            totalEmojiNum = document.getElementById('emojiWrapper').children.length;
        while (match = reg.exec(msg)) {
            emojiIndex = match[0].slice(7, -1);
            if (emojiIndex > totalEmojiNum) {
                result = result.replace(match[0], '[X]');
            } else {
                result = result.replace(match[0], '<img class="emoji" src="/chat/content/emoji/' + emojiIndex + '.gif" />');//todo:fix this in chrome it will cause a new request for the image
            }
            ;
        }
        ;
        return result;
    }
};
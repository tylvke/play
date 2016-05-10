"use strict"

exports.whisper=function *(){
    yield this.render('chat/whisper',{
        "title":"青春乐园"
    });
};
exports.room=function *(){
    yield this.render('chat/room',{
        "title":"青春乐园聊天室"
    });
};
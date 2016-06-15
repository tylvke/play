"use strict";

var Article=require('../controllers/article');
var Chat=require('../controllers/chat');


module.exports=function(router){
    //首页
    router.get('/',Article.index);
    //聊天室
    router.get('/chat/whisper',Chat.whisper);
    router.get('/chat/room',Chat.room);

};
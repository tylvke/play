"use strict";

var Auth=require('../middlewares/auth');
var Article=require('../controllers/article');
var User=require('../controllers/user');

module.exports=function(router){
    router.get('/article/delete/:articleId',Auth(),Article.remove);
    router.get('/login',Auth(),User.login);
};
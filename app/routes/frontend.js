"use strict";

var Article=require('../controllers/article');

module.exports=function(router){
    //首页
    router.get('/',Article.index);
};